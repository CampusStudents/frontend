export type StoredFavorite = string | number;

const STORAGE_KEY_PREFIX = "campus.favorites";

export const getFavoritesStorageKey = (userId: string) =>
    `${STORAGE_KEY_PREFIX}.${userId}`;

export const isFavoritesStorageKey = (key: string) =>
    key === STORAGE_KEY_PREFIX || key.startsWith(`${STORAGE_KEY_PREFIX}.`);

const isStoredFavoriteId = (value: unknown): value is StoredFavorite =>
    typeof value === "string" || typeof value === "number";

export const favoritesStorage = {
    getAll(userId: string | null): StoredFavorite[] {
        if (!userId) {
            return [];
        }

        try {
            const raw = localStorage.getItem(getFavoritesStorageKey(userId));

            if (!raw) {
                return [];
            }

            const parsed: unknown = JSON.parse(raw);

            if (!Array.isArray(parsed)) {
                return [];
            }

            return parsed.filter(isStoredFavoriteId);
        } catch {
            return [];
        }
    },

    saveAll(userId: string | null, favorites: StoredFavorite[]): void {
        if (!userId) {
            return;
        }

        localStorage.setItem(
            getFavoritesStorageKey(userId),
            JSON.stringify(favorites),
        );
    },

    add(userId: string | null, id: StoredFavorite): StoredFavorite[] {
        const favorites = this.getAll(userId);
        const exists = favorites.some((item) => String(item) === String(id));

        if (exists) {
            return favorites;
        }

        const next = [...favorites, id];
        this.saveAll(userId, next);

        return next;
    },

    remove(userId: string | null, id: string | number): StoredFavorite[] {
        const next = this.getAll(userId).filter(
            (item) => String(item) !== String(id),
        );
        this.saveAll(userId, next);

        return next;
    },

    has(userId: string | null, id: string | number): boolean {
        return this.getAll(userId).some((item) => String(item) === String(id));
    },
};
