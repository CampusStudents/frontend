import { matchPath } from "react-router-dom";

import { routePaths } from "@shared/config";

type RouteMeta = {
    title: string;
    description: string;
};

const titleSuffix = "Campus";

const defaultRouteMeta: RouteMeta = {
    title: titleSuffix,
    description:
        "Campus помогает находить проекты, мероприятия и команды для совместной работы.",
};

const routeMetaEntries: Array<{ path: string; meta: RouteMeta }> = [
    {
        path: routePaths.home,
        meta: {
            title: `Проекты и мероприятия | ${titleSuffix}`,
            description:
                "Лента проектов и мероприятий для поиска команды, практики и совместной работы.",
        },
    },
    {
        path: routePaths.projects,
        meta: {
            title: `Мои проекты | ${titleSuffix}`,
            description:
                "Управление своими проектами, кандидатами и рабочими сценариями команды.",
        },
    },
    {
        path: routePaths.project,
        meta: {
            title: `Страница проекта | ${titleSuffix}`,
            description:
                "Описание проекта, требования, связанное мероприятие и действия для участников.",
        },
    },
    {
        path: routePaths.createProject,
        meta: {
            title: `Создание проекта | ${titleSuffix}`,
            description:
                "Форма создания проекта: описание, команда, роли и стек технологий.",
        },
    },
    {
        path: routePaths.event,
        meta: {
            title: `Мероприятие | ${titleSuffix}`,
            description:
                "Информация о мероприятии, организаторе и действиях для подписки и запуска проекта.",
        },
    },
    {
        path: routePaths.favorites,
        meta: {
            title: `Избранное | ${titleSuffix}`,
            description:
                "Сохраненные проекты и быстрый доступ к интересующим вас предложениям.",
        },
    },
    {
        path: routePaths.notifications,
        meta: {
            title: `Уведомления | ${titleSuffix}`,
            description:
                "Лента уведомлений по проектам, откликам и обновлениям внутри платформы.",
        },
    },
    {
        path: routePaths.profile,
        meta: {
            title: `Профиль | ${titleSuffix}`,
            description:
                "Профиль участника: опыт, контакты, навыки и интересы.",
        },
    },
    {
        path: routePaths.organizer,
        meta: {
            title: `Организатор | ${titleSuffix}`,
            description:
                "Профиль организатора, его мероприятия и публичная информация.",
        },
    },
    {
        path: routePaths.candidates,
        meta: {
            title: `Кандидаты | ${titleSuffix}`,
            description:
                "Просмотр кандидатов и управление откликами по вашему проекту.",
        },
    },
    {
        path: routePaths.login,
        meta: {
            title: `Вход | ${titleSuffix}`,
            description:
                "Авторизация в Campus для доступа к проектам, профилю и уведомлениям.",
        },
    },
    {
        path: routePaths.register,
        meta: {
            title: `Регистрация | ${titleSuffix}`,
            description:
                "Создание аккаунта Campus для участия в проектах и мероприятиях.",
        },
    },
    {
        path: routePaths.verifyEmail,
        meta: {
            title: `Подтверждение почты | ${titleSuffix}`,
            description:
                "Подтверждение адреса электронной почты для активации аккаунта.",
        },
    },
    {
        path: routePaths.verifyEmailPending,
        meta: {
            title: `Ожидание подтверждения | ${titleSuffix}`,
            description:
                "Инструкция по подтверждению почты после регистрации в Campus.",
        },
    },
];

export const getRouteMeta = (pathname: string): RouteMeta => {
    const matchedRoute = routeMetaEntries.find(({ path }) =>
        matchPath({ path, end: true }, pathname),
    );

    return matchedRoute?.meta ?? defaultRouteMeta;
};
