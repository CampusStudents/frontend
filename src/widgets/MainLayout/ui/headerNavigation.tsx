import {
    CalendarMonthRounded,
    FavoriteBorderRounded,
    NotificationsNoneRounded,
    PersonOutlineRounded,
    WorkOutlineRounded,
} from "@mui/icons-material";

import { routePaths } from "@shared/config";

export type HeaderNavigationItem = {
    icon?: React.ReactNode;
    label: string;
    to: string;
};

export const getHeaderNavigationItems = (
    isAuthenticated: boolean,
): HeaderNavigationItem[] => [
    ...(isAuthenticated
        ? [
              {
                  icon: <NotificationsNoneRounded fontSize="small" />,
                  label: "Уведомления",
                  to: routePaths.notifications,
              },
              {
                  icon: <FavoriteBorderRounded fontSize="small" />,
                  label: "Избранное",
                  to: routePaths.favorites,
              },
          ]
        : [
              {
                  icon: <WorkOutlineRounded fontSize="small" />,
                  label: "Проекты",
                  to: routePaths.home,
              },
              {
                  icon: <CalendarMonthRounded fontSize="small" />,
                  label: "Мероприятия",
                  to: routePaths.home,
              },
          ]),
    {
        icon: <PersonOutlineRounded fontSize="small" />,
        label: isAuthenticated ? "Профиль" : "Войти",
        to: isAuthenticated ? routePaths.profile : routePaths.login,
    },
];
