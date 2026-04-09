import type {
    ProjectCandidate,
    ProjectDetails,
    ProjectRequirement,
} from "./types";

export const projectDetails: ProjectDetails = {
    title: "Воркшоп Т-Банк - как попасть на стажировку",
    organizer: "Понедельник, 11 ноября",
    venue: "Beloi Art Gallery",
    address: "Москва, Нижняя Сыромятническая",
    actionLabel: "Пойду",
    aboutLabel: "О событии",
    description: [
        "Программа собрана для студентов и начинающих специалистов, которые хотят понять, как устроен отбор на стажировки и что на практике ждут от junior-кандидатов.",
        "На встрече разберут оформление резюме, типовые ошибки в тестовых заданиях и формат командной работы на реальных кейсах. После основной части можно задать вопросы и познакомиться с участниками.",
    ],
    requirementsTitle: "Требуется:",
    requirementsFooter: "18 подтверждено свое участие",
    eventTitle: "Мероприятие: Стажировка Т-Банк",
    linkLabel: "Перейти к мероприятию",
    galleryTitle: "Фотографии с мероприятия:",
    heroImage:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    gallery: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=900&q=80",
    ],
};

export const projectRequirements: ProjectRequirement[] = [
    {
        title: "Frontend",
        description:
            "React, TypeScript и уверенная вёрстка. Нужен человек, который быстро соберет интерфейс и не потеряет детали.",
        stack: "React",
    },
    {
        title: "Fullstack",
        description:
            "Нужен разработчик с опытом в Next.js и NestJS, чтобы связать интерфейс, API и простую бизнес-логику.",
        stack: "Nest",
    },
    {
        title: "Backend",
        description:
            "Ищем разработчика для проектирования API, авторизации и интеграции с внешними сервисами без перегруза архитектуры.",
        stack: "Node.js",
    },
    {
        title: "Product Designer",
        description:
            "Нужен дизайнер, который быстро соберет пользовательские сценарии, экранные состояния и наведет порядок в UI.",
        stack: "Figma",
    },
    {
        title: "Project Manager",
        description:
            "Нужен человек, который возьмет на себя коммуникацию, тайминг задач, синхронизацию команды и презентацию результата.",
        stack: "Agile",
    },
    {
        title: "QA Engineer",
        description:
            "Ищем тестировщика, который поможет быстро проверить критические сценарии, баги и стабильность перед демо.",
        stack: "Testing",
    },
];

export const projectCandidates: ProjectCandidate[] = [
    {
        id: 1,
        name: "Алина Сергеева",
        role: "Frontend Developer",
        summary:
            "Собирает аккуратные интерфейсы на React, любит чистые состояния и быстрые прототипы.",
        skills: ["React", "TypeScript", "MUI"],
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 2,
        name: "Максим Волков",
        role: "Fullstack Developer",
        summary:
            "Работает на стыке frontend и backend, быстро доводит MVP до рабочего состояния.",
        skills: ["Next.js", "NestJS", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 3,
        name: "Дарья Климова",
        role: "Product Designer",
        summary:
            "Проектирует user flow, UI-системы и помогает команде не терять фокус на пользователе.",
        skills: ["UX", "UI", "Research"],
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 4,
        name: "Илья Романов",
        role: "Backend Developer",
        summary:
            "Собирает API, базовые интеграции и инфраструктуру для командных проектов и хакатонов.",
        skills: ["Node.js", "NestJS", "Docker"],
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    },
];
