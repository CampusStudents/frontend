import { axiosInstance } from "./axios";
import type {
    SkillDTO,
    UpdateUserProfileSchema,
    UserProfileDTO,
} from "./generated/model";

type ImageDTO = {
    id: string;
    url: string;
};

export type OrganizationDTO = {
    id: string;
    name: string;
    description?: string | null;
    contact_email?: string | null;
    images?: ImageDTO[];
};

export type EventDTO = {
    id: string;
    title: string;
    description?: string | null;
    date_start: string;
    date_end: string;
    format?: string | null;
    registration_link?: string | null;
    organizer_id?: string | null;
    organizer?: OrganizationDTO | null;
    images?: ImageDTO[];
};

export type NotificationDTO = {
    id: string;
    title: string;
    body: string;
    created_at: string;
    read_at?: string | null;
};

export type PortfolioItemDTO = {
    id: string;
    title: string;
    description?: string | null;
    work_started_at?: string | null;
    work_ended_at?: string | null;
    team_role: {
        id: string;
        name: string;
    };
};

export type UpdateMyProfilePayload = UpdateUserProfileSchema & {
    status?: string | null;
    telegram?: string | null;
    site?: string | null;
};

export type ReplaceMySkillsPayload = {
    skill_ids: string[];
};

const unwrap = <T>(data: unknown): T => {
    if (data && typeof data === "object") {
        const response = data as Record<string, unknown>;

        if (Array.isArray(response.items)) {
            return response.items as T;
        }

        if ("data" in response) {
            return response.data as T;
        }

        if (Array.isArray(response.results)) {
            return response.results as T;
        }

        if ("content" in response) {
            return response.content as T;
        }
    }

    return data as T;
};

const request = async <T>(config: {
    url: string;
    method?: "GET" | "PATCH" | "POST";
    data?: unknown;
    params?: unknown;
    signal?: AbortSignal;
}): Promise<T> => {
    const { data } = await axiosInstance(config);

    return unwrap<T>(data);
};

export const getEventsQueryKey = (params?: Record<string, unknown>) =>
    params ? ["/api/v1/events", params] : ["/api/v1/events"];

export const getEvents = (
    params?: Record<string, unknown>,
    signal?: AbortSignal,
) =>
    request<EventDTO[]>({
        url: "/api/v1/events",
        method: "GET",
        params,
        signal,
    });

export const getEventQueryKey = (eventId?: string | null) => [
    "/api/v1/events",
    eventId,
];

export const getEvent = (eventId: string, signal?: AbortSignal) =>
    request<EventDTO>({
        url: `/api/v1/events/${eventId}`,
        method: "GET",
        signal,
    });

export const getOrganizationQueryKey = (organizationId?: string | null) => [
    "/api/v1/organizations",
    organizationId,
];

export const getOrganization = (organizationId: string, signal?: AbortSignal) =>
    request<OrganizationDTO>({
        url: `/api/v1/organizations/${organizationId}`,
        method: "GET",
        signal,
    });

export const getNotificationsQueryKey = () => ["/api/v1/notifications"];

export const getNotifications = (signal?: AbortSignal) =>
    request<NotificationDTO[]>({
        url: "/api/v1/notifications",
        method: "GET",
        signal,
    });

export const markNotificationAsRead = (notificationId: string) =>
    request<NotificationDTO>({
        url: `/api/v1/notifications/${notificationId}/read`,
        method: "POST",
    });

export const getMyProfileQueryKey = () => ["/api/v1/users/me/profile"];

export const getMyProfile = (signal?: AbortSignal) =>
    request<UserProfileDTO & Partial<UpdateMyProfilePayload>>({
        url: "/api/v1/users/me/profile",
        method: "GET",
        signal,
    });

export const updateMyProfile = (payload: UpdateMyProfilePayload) =>
    request<UserProfileDTO & Partial<UpdateMyProfilePayload>>({
        url: "/api/v1/users/me/profile",
        method: "PATCH",
        data: payload,
    });

export const getMySkillsQueryKey = () => ["/api/v1/users/me/skills"];

export const getMySkills = (signal?: AbortSignal) =>
    request<SkillDTO[]>({
        url: "/api/v1/users/me/skills",
        method: "GET",
        signal,
    });

export const replaceMySkills = (payload: ReplaceMySkillsPayload) =>
    request<SkillDTO[]>({
        url: "/api/v1/users/me/skills",
        method: "PATCH",
        data: payload,
    });

export const getMyPortfolioItemsQueryKey = () => ["/api/v1/users/me/portfolio"];

export const getMyPortfolioItems = (signal?: AbortSignal) =>
    request<PortfolioItemDTO[]>({
        url: "/api/v1/users/me/portfolio",
        method: "GET",
        signal,
    });
