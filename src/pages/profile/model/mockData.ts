import type { ProfileDetails, ProfileStat, ProfileTimelineItem } from "./types";

export const profileDetails: ProfileDetails = {
    initials: "ЕК",
    fullName: "Егор Крылов",
    role: "Frontend Developer",
    city: "Москва",
    format: "Гибридный формат",
    university: "МИФИ, 3 курс",
    bio: "Собираю интерфейсы для образовательных и командных продуктов. Интересуют проекты, где важны понятный UX, аккуратная архитектура и быстрый цикл проверки идей.",
    email: "egor.krylov@campus.dev",
    telegram: "@egork_front",
    portfolio: "egorkrylov.dev",
};

export const profileStats: ProfileStat[] = [
    { label: "Проектов", value: "4" },
    { label: "Откликов", value: "12" },
    { label: "В команде", value: "2" },
];

export const profileSkills = [
    "React",
    "TypeScript",
    "Next.js",
    "MUI",
    "React Query",
    "FSD",
];

export const profileInterests = [
    "Образовательные продукты",
    "Внутренние сервисы",
    "Платформы для сообществ",
];

export const profileTimeline: ProfileTimelineItem[] = [
    {
        title: "Campus Frontend",
        period: "2025 - сейчас",
        description:
            "Отвечаю за проектные страницы, форму создания проекта и общие UI-сценарии.",
    },
    {
        title: "Студенческий медиацентр",
        period: "2024 - 2025",
        description:
            "Собирал лендинги мероприятий и поддерживал интерфейсы внутренних инструментов команды.",
    },
];

export const profileStatus =
    "Открыт к участию в небольших продуктовых командах и проектных задачах на фронтенде. Предпочитаю роли с понятной зоной ответственности и плотной обратной связью.";
