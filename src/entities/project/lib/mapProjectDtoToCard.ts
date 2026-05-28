import type { MyProjectCardData, ProjectCardData } from "../model/types";

import {
    getProjectEventId,
    getProjectEventTitle,
} from "./getProjectEventTitle";

import type {
    CityDTO,
    ProjectDTO,
    ProjectFormat,
    ProjectType,
} from "@shared/api/generated/model";

type ProjectCardViewModel = {
    card: ProjectCardData;
    tags: string[];
};

const projectTypeLabels: Record<ProjectType, string> = {
    commercial: "Коммерческий",
    hackathon: "Хакатон",
    startup: "Стартап",
    study: "Учебный",
};

const projectFormatLabels: Record<ProjectFormat, string> = {
    hybrid: "Гибрид",
    offline: "Офлайн",
    online: "Онлайн",
};

const projectStatusLabels: Record<string, string> = {
    active: "Активен",
    archived: "В архиве",
    completed: "Завершен",
    draft: "Не опубликован",
};

const formatDateParts = (isoDate: string) => {
    const date = new Date(isoDate);

    if (Number.isNaN(date.getTime())) {
        return {
            date: "Дата не указана",
            weekday: "",
        };
    }

    return {
        date: new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
        }).format(date),
        weekday: new Intl.DateTimeFormat("ru-RU", {
            weekday: "long",
        }).format(date),
    };
};

const capitalize = (value: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

const getProjectTags = (project: ProjectDTO) =>
    [
        projectTypeLabels[project.type],
        projectFormatLabels[project.format],
    ].filter(Boolean);

const getProjectDescription = (project: ProjectDTO) =>
    project.description?.trim() || "Описание проекта пока не заполнено.";

const getProjectMeta = (project: ProjectDTO) =>
    `Формат: ${projectFormatLabels[project.format]}`;

const getProjectCityName = (project: ProjectDTO, cities: CityDTO[]) =>
    cities.find((city) => city.id === project.city_id)?.name ?? null;

const getProjectSubtitle = (project: ProjectDTO) =>
    project.status
        ? `Статус: ${projectStatusLabels[project.status] ?? project.status}`
        : `Тип: ${projectTypeLabels[project.type]}`;

export const mapProjectDtoToProjectCard = (
    project: ProjectDTO,
    cities: CityDTO[],
    eventsById?: Record<string, string>,
): ProjectCardViewModel => {
    const { date } = formatDateParts(project.created_at);
    const cityName = getProjectCityName(project, cities);
    const eventId = getProjectEventId(project);
    const eventTitle = getProjectEventTitle(project, eventsById);

    return {
        card: {
            id: project.id,
            date,
            title: project.title,
            destination: eventTitle,
            eventId,
            eventTitle,
            subtitle: getProjectSubtitle(project),
            description: getProjectDescription(project),
            meta: cityName
                ? `${cityName} | ${projectFormatLabels[project.format]}`
                : getProjectMeta(project),
            members: "Состав уточняется",
        },
        tags: getProjectTags(project),
    };
};

export const mapProjectDtoToMyProjectCard = (
    project: ProjectDTO,
    cities: CityDTO[],
    eventsById?: Record<string, string>,
): MyProjectCardData => {
    const { date, weekday } = formatDateParts(project.created_at);
    const cityName = getProjectCityName(project, cities);
    const eventId = getProjectEventId(project);
    const eventTitle = getProjectEventTitle(project, eventsById);

    return {
        id: project.id,
        date,
        weekday: capitalize(weekday),
        title: project.title,
        destination: eventTitle,
        eventId,
        eventTitle,
        subtitle: getProjectSubtitle(project),
        description: getProjectDescription(project),
        meta: cityName
            ? `${cityName} | ${projectFormatLabels[project.format]}`
            : getProjectMeta(project),
        members: "Состав уточняется",
    };
};
