import type { CandidatesCardData } from "@entities/project";

export const candidatesCardTags = ["React", "TypeScript", "Next", "Nest"];

export const candidateCards: CandidatesCardData[] = Array.from(
    { length: 2 },
    (_, index) => ({
        id: index + 1,
        name: "Иван Иванов",
        age: 20,
        about: "Сливы такие вкусняяшки я не могу просто мееед",
        city: "Москва | Offline",
    }),
);
