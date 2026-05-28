import type { ProjectCardData } from "@entities/project";

export type StoredFavorite = {
    id: string | number;
    card: ProjectCardData;
    tags: string[];
};

const STORAGE_KEY = "campus.favorites";

const isStoredFavorite = (value: unknown): value is StoredFavorite => {
    if (!value || typeof value !== "object") {
        return false;
    }

    const record = value as StoredFavorite;

    return (
        (typeof record.id === "string" || typeof record.id === "number") &&
        typeof record.card === "object" &&
        record.card !== null &&
        Array.isArray(record.tags)
    );
};

export const favoritesStorage = {
    getAll(): StoredFavorite[] {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);

            if (!raw) {
                return [];
            }

            const parsed: unknown = JSON.parse(raw);

            if (!Array.isArray(parsed)) {
                return [];
            }

            return parsed.filter(isStoredFavorite);
        } catch {
            return [];
        }
    },

    saveAll(favorites: StoredFavorite[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    },

    add(favorite: StoredFavorite): StoredFavorite[] {
        const favorites = this.getAll();
        const exists = favorites.some(
            (item) => String(item.id) === String(favorite.id),
        );

        if (exists) {
            return favorites;
        }

        const next = [...favorites, favorite];
        this.saveAll(next);

        return next;
    },

    remove(id: string | number): StoredFavorite[] {
        const next = this.getAll().filter(
            (item) => String(item.id) !== String(id),
        );
        this.saveAll(next);

        return next;
    },

    has(id: string | number): boolean {
        return this.getAll().some((item) => String(item.id) === String(id));
    },
};
