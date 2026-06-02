import type { ProjectDetails, ProjectRequirement } from "../model/types";

import type {
    CityDTO,
    ProjectDTO,
    ProjectVacancyDTO,
    TeamMemberDTO,
    TeamRoleDTO,
} from "@shared/api/generated/model";

const projectTypeLabels = {
    commercial: "Коммерческий проект",
    hackathon: "Хакатон",
    startup: "Стартап",
    study: "Учебный проект",
} as const;

const projectFormatLabels = {
    hybrid: "Гибрид",
    offline: "Оффлайн",
    online: "Онлайн",
} as const;

const fallbackHeroImage = "/logo.svg";

const formatProjectDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Дата не указана";
    }

    return new Intl.DateTimeFormat("ru-RU", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(date);
};

const formatProjectDateBadge = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return {
            day: "--",
            month: "---",
        };
    }

    return {
        day: new Intl.DateTimeFormat("ru-RU", {
            day: "2-digit",
        }).format(date),
        month: new Intl.DateTimeFormat("ru-RU", {
            month: "short",
        })
            .format(date)
            .replace(".", ""),
    };
};

export const mapProjectDtoToDetails = (
    project: ProjectDTO,
    cities: CityDTO[],
    teamMembers: TeamMemberDTO[],
): ProjectDetails => {
    const cityName =
        cities.find((city) => city.id === project.city_id)?.name ??
        "Город не указан";
    const { day, month } = formatProjectDateBadge(project.created_at);

    return {
        eventId: project.event_id ?? null,
        dateDay: day,
        dateMonth: month,
        title: project.title,
        organizer: formatProjectDate(project.created_at),
        venue: projectTypeLabels[project.type],
        address: `${cityName} | ${projectFormatLabels[project.format]}`,
        actionLabel: "Подать заявку",
        aboutLabel: "О проекте",
        description: [
            project.description?.trim() ||
                "Описание проекта пока не заполнено.",
        ],
        requirementsTitle: "Открытые роли",
        requirementsFooter:
            teamMembers.length > 0
                ? `Сейчас в команде ${teamMembers.length} участник(ов)`
                : "Команда пока формируется",
        eventTitle: "Связанное мероприятие",
        linkLabel: "Открыть страницу мероприятия",
        galleryTitle: "Материалы и медиа",
        heroImage: fallbackHeroImage,
        gallery: [],
    };
};

export const mapProjectVacanciesToRequirements = (
    vacancies: ProjectVacancyDTO[],
    teamRoles: TeamRoleDTO[],
): ProjectRequirement[] =>
    vacancies.map((vacancy) => {
        const role = teamRoles.find(
            (teamRole) => teamRole.id === vacancy.team_role_id,
        );
        const skills = vacancy.skills
            .map((skill) => skill.name)
            .filter(Boolean);

        return {
            vacancyId: vacancy.id,
            title: role?.name ?? "Роль не указана",
            description:
                vacancy.description?.trim() ||
                role?.description?.trim() ||
                "Описание роли пока не заполнено.",
            stack: skills[0] ?? `${vacancy.required_count} мест`,
        };
    });
