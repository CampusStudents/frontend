import type { MyProjectCardData } from "@entities/project";

export const projectCardTags = ["React", "TypeScript", "Next", "Nest"];

export const projectCards: MyProjectCardData[] = Array.from(
    { length: 2 },
    (_, index) => ({
        id: index + 1,
        date: "11 ноября",
        weekday: "Понедельник",
        title: "Воркшоп Т-Банк - как попасть на стажировку",
        destination: "Стажировка Т-Банк",
        subtitle: "Ищем: Frontend, Fullstack(Next+Nest)",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        meta: "Москва | Offline",
        members: "3 / 5 участников",
    }),
);
