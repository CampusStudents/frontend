import type { ProjectDetails, ProjectRequirement } from "../model/types";

import type {
    CityDTO,
    ProjectDTO,
    ProjectVacancyDTO,
    TeamMemberDTO,
    TeamRoleDTO,
} from "@shared/api/generated/model";
import type { EventDTO } from "@shared/api/liveApi";

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

const eventFormatLabels: Record<string, string> = {
    offline: "Оффлайн",
    online: "Онлайн",
};

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

const formatEventPeriod = (event?: EventDTO | null) => {
    if (!event) {
        return "";
    }

    const start = new Date(event.date_start);
    const end = new Date(event.date_end);

    if (Number.isNaN(start.getTime())) {
        return "";
    }

    const date = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(start);

    if (Number.isNaN(end.getTime())) {
        return date;
    }

    const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${date}, ${timeFormatter.format(start)} - ${timeFormatter.format(end)}`;
};

export const mapProjectDtoToDetails = (
    project: ProjectDTO,
    cities: CityDTO[],
    teamMembers: TeamMemberDTO[],
    event?: EventDTO | null,
): ProjectDetails => {
    const cityName =
        cities.find((city) => city.id === project.city_id)?.name ??
        "Город не указан";
    const { day, month } = formatProjectDateBadge(project.created_at);
    const eventTitle = event?.title ?? "Связанное мероприятие";
    const eventDescription =
        event?.description?.trim() || "Описание мероприятия пока не заполнено.";

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
        eventTitle,
        eventDescription: [eventDescription],
        eventOrganizer: event?.organizer?.name ?? "Организатор не указан",
        eventDate: formatEventPeriod(event),
        eventFormat: event?.format
            ? (eventFormatLabels[event.format] ?? event.format)
            : "",
        eventRegistrationLink: event?.registration_link ?? null,
        linkLabel: "Открыть страницу мероприятия",
        galleryTitle: "Материалы мероприятия",
        gallery: event?.images?.map((image) => image.url) ?? [],
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
