export type NotificationItem = {
    id: number;
    title: string;
    description: string;
    time: string;
    unread: boolean;
};

export const notificationItems: NotificationItem[] = [
    {
        id: 1,
        title: "Вас пригласили в команду проекта Campus Media",
        description:
            "Организатор оставил комментарий и ждет подтверждение участия до 18:00.",
        time: "2 минуты назад",
        unread: true,
    },
    {
        id: 2,
        title: "Проект AI Lab добавлен в избранное",
        description:
            "Мы сохранили карточку в подборку, чтобы вы могли быстро вернуться к ней позже.",
        time: "12 минут назад",
        unread: true,
    },
    {
        id: 3,
        title: "Организатор ответил на вашу заявку",
        description:
            "Попросили прислать портфолио и коротко описать ваш опыт в продуктовых задачах.",
        time: "Сегодня, 10:24",
        unread: true,
    },
    {
        id: 4,
        title: "Новая подборка проектных вакансий на кампусе",
        description:
            "Появились роли для дизайнеров, frontend-разработчиков и project-менеджеров.",
        time: "Сегодня, 09:10",
        unread: true,
    },
    {
        id: 5,
        title: "Напоминание о дедлайне отклика",
        description:
            "До закрытия отклика на Urban Tech осталось меньше суток. Если проект интересен, лучше ответить сейчас.",
        time: "Вчера, 21:05",
        unread: false,
    },
    {
        id: 6,
        title: "Ваша заявка просмотрена",
        description:
            "Команда проекта Green Shift открыла ваш профиль и изучила навыки по frontend и аналитике.",
        time: "Вчера, 16:40",
        unread: false,
    },
];
