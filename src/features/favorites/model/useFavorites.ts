import { useCallback, useMemo, useSyncExternalStore } from "react";

import {
    favoritesStorage,
    isFavoritesStorageKey,
    type StoredFavorite,
} from "../lib/favoritesStorage";

import { useAuthGetUser } from "@shared/api";
import type { UserDTO } from "@shared/api/generated/model";
import { tokenStorage } from "@shared/lib/auth";
import { time } from "@shared/lib/time";

const FAVORITES_CHANGE_EVENT = "campus:favorites-change";

const snapshotCache = new Map<string, StoredFavorite[]>();

const getSnapshotCacheKey = (userId: string | null) => userId ?? "";

const getFavoritesSnapshot = (userId: string | null): StoredFavorite[] => {
    const cacheKey = getSnapshotCacheKey(userId);
    const cachedSnapshot = snapshotCache.get(cacheKey);
    const next = favoritesStorage.getAll(userId);
    const nextKey = JSON.stringify(next);

    if (JSON.stringify(cachedSnapshot) !== nextKey) {
        snapshotCache.set(cacheKey, next);

        return next;
    }

    return cachedSnapshot ?? next;
};

const getServerSnapshot = () => [];

const subscribe = (onStoreChange: () => void) => {
    const handleStorage = (event: StorageEvent) => {
        if (event.key === null || isFavoritesStorageKey(event.key)) {
            onStoreChange();
        }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(FAVORITES_CHANGE_EVENT, onStoreChange);

    return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(FAVORITES_CHANGE_EVENT, onStoreChange);
    };
};

const notifyChange = (userId: string | null) => {
    getFavoritesSnapshot(userId);
    window.dispatchEvent(new Event(FAVORITES_CHANGE_EVENT));
};

export const useFavorites = () => {
    const hasAccessToken = Boolean(tokenStorage.get());
    const { data: user } = useAuthGetUser<UserDTO>({
        query: {
            enabled: hasAccessToken,
            retry: false,
            staleTime: time.s(1),
        },
    });
    const userId = user?.id ?? null;

    const getSnapshot = useMemo(
        () => () => getFavoritesSnapshot(userId),
        [userId],
    );

    const favorites = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );

    const addFavorite = useCallback(
        (id: string | number) => {
            const next = favoritesStorage.add(userId, id);
            notifyChange(userId);

            return next;
        },
        [userId],
    );

    const removeFavorite = useCallback(
        (id: string | number) => {
            const next = favoritesStorage.remove(userId, id);
            notifyChange(userId);

            return next;
        },
        [userId],
    );

    const isFavorite = useCallback(
        (id: string | number) =>
            favorites.some((item) => String(item) === String(id)),
        [favorites],
    );

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
};

export type { StoredFavorite };
