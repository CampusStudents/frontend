import { useCallback, useSyncExternalStore } from "react";

import { favoritesStorage, type StoredFavorite } from "../lib/favoritesStorage";

import type { ProjectCardData } from "@entities/project";

const FAVORITES_CHANGE_EVENT = "campus:favorites-change";

let cachedSnapshot: StoredFavorite[] = [];
let cachedSnapshotKey = "";

const updateSnapshotCache = (): StoredFavorite[] => {
    const next = favoritesStorage.getAll();
    const nextKey = JSON.stringify(next);

    if (nextKey !== cachedSnapshotKey) {
        cachedSnapshotKey = nextKey;
        cachedSnapshot = next;
    }

    return cachedSnapshot;
};

const getSnapshot = () => updateSnapshotCache();

const getServerSnapshot = () => cachedSnapshot;

const subscribe = (onStoreChange: () => void) => {
    const handleStorage = (event: StorageEvent) => {
        if (event.key === null || event.key === "campus.favorites") {
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

const notifyChange = () => {
    updateSnapshotCache();
    window.dispatchEvent(new Event(FAVORITES_CHANGE_EVENT));
};

export const useFavorites = () => {
    const favorites = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );

    const addFavorite = useCallback((card: ProjectCardData, tags: string[]) => {
        const next = favoritesStorage.add({ id: card.id, card, tags });
        notifyChange();

        return next;
    }, []);

    const removeFavorite = useCallback((id: string | number) => {
        const next = favoritesStorage.remove(id);
        notifyChange();

        return next;
    }, []);

    const isFavorite = useCallback(
        (id: string | number) =>
            favorites.some((item) => String(item.id) === String(id)),
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
