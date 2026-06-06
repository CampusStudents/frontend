import { axiosInstance } from "./axios";

export type EventDTO = {
    id: string;
    created_at: string;
    updated_at: string | null;
    organizer_id: string | null;
    city_id: string | null;
    title: string;
    description?: string | null;
    date_start: string;
    date_end: string;
    application_deadline?: string | null;
    format?: string | null;
    registration_link?: string | null;
    status: string;
    organizer?: {
        id: string;
        name: string;
        contact_email: string;
    } | null;
    images?: EventImageUrlDTO[];
};

export type EventImageUrlDTO = {
    id: string;
    created_at: string;
    updated_at: string | null;
    event_id: string;
    url: string;
};

export type NotificationDTO = {
    id: string;
    created_at: string;
    updated_at: string | null;
    user_id: string;
    application_id?: string | null;
    type: string;
    title: string;
    body: string;
    read_at?: string | null;
};

export type OrganizationDTO = {
    id: string;
    created_at: string;
    updated_at: string | null;
    name: string;
    description?: string | null;
    contact_email?: string | null;
    images?: OrganizationImageUrlDTO[];
};

export type OrganizationImageUrlDTO = {
    id: string;
    created_at: string;
    updated_at: string | null;
    organization_id: string;
    url: string;
};

export type PortfolioItemDTO = {
    id: string;
    created_at: string;
    updated_at: string | null;
    user_id: string;
    title: string;
    description?: string | null;
    work_started_at?: string | null;
    work_ended_at?: string | null;
    team_role_id: string;
    project_link?: string | null;
    team_role: {
        id: string;
        name: string;
    };
};

export type UserProfileDTO = {
    id: string;
    created_at: string;
    updated_at: string | null;
    first_name: string;
    last_name: string;
    bio?: string | null;
    status?: string | null;
    telegram?: string | null;
    site?: string | null;
    city_id: string;
    university_id: string;
    user_id: string;
};

export type UpdateUserProfileSchema = {
    first_name?: string | null;
    last_name?: string | null;
    bio?: string | null;
    status?: string | null;
    telegram?: string | null;
    site?: string | null;
    city_id?: string | null;
    university_id?: string | null;
};

export type ReplaceUserSkillsSchema = {
    skill_ids: string[];
};

export const getEventsQueryKey = () => ["/api/v1/events/"] as const;

export const getEventQueryKey = (eventId?: string) =>
    ["/api/v1/events", eventId] as const;

export const getEvents = async (
    params?: {
        organizer_id?: string[];
    },
    signal?: AbortSignal,
) => {
    const { data } = await axiosInstance.get<EventDTO[]>("/api/v1/events/", {
        params: {
            limit: 100,
            ...params,
        },
        signal,
    });

    return data;
};

export const getEvent = async (eventId: string, signal?: AbortSignal) => {
    const { data } = await axiosInstance.get<EventDTO>(
        `/api/v1/events/${eventId}`,
        { signal },
    );

    return data;
};

export const uploadEventImage = async (eventId: string, image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    const { data } = await axiosInstance.post<EventImageUrlDTO>(
        `/api/v1/events/${eventId}/images`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return data;
};

export const deleteEventImage = async (eventId: string, imageId: string) => {
    await axiosInstance.delete(`/api/v1/events/${eventId}/images/${imageId}`);
};

export const getNotificationsQueryKey = () =>
    ["/api/v1/notifications/me"] as const;

export const getNotifications = async (signal?: AbortSignal) => {
    const { data } = await axiosInstance.get<NotificationDTO[]>(
        "/api/v1/notifications/me",
        {
            params: {
                limit: 100,
            },
            signal,
        },
    );

    return data;
};

export const markNotificationAsRead = async (notificationId: string) => {
    const { data } = await axiosInstance.patch<NotificationDTO>(
        `/api/v1/notifications/${notificationId}/read`,
    );

    return data;
};

export const getOrganizationsQueryKey = () =>
    ["/api/v1/organizations/"] as const;

export const getOrganizationQueryKey = (organizationId?: string) =>
    ["/api/v1/organizations", organizationId] as const;

export const getOrganizations = async (signal?: AbortSignal) => {
    const { data } = await axiosInstance.get<OrganizationDTO[]>(
        "/api/v1/organizations/",
        {
            params: {
                limit: 100,
            },
            signal,
        },
    );

    return data;
};

export const getOrganization = async (
    organizationId: string,
    signal?: AbortSignal,
) => {
    const { data } = await axiosInstance.get<OrganizationDTO>(
        `/api/v1/organizations/${organizationId}`,
        { signal },
    );

    return data;
};

export const uploadOrganizationImage = async (
    organizationId: string,
    image: File,
) => {
    const formData = new FormData();
    formData.append("image", image);

    const { data } = await axiosInstance.post<OrganizationImageUrlDTO>(
        `/api/v1/organizations/${organizationId}/images`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return data;
};

export const deleteOrganizationImage = async (
    organizationId: string,
    imageId: string,
) => {
    await axiosInstance.delete(
        `/api/v1/organizations/${organizationId}/images/${imageId}`,
    );
};

export const getMyPortfolioItemsQueryKey = () =>
    ["/api/v1/users/portfolio-items"] as const;

export const getMyPortfolioItems = async (signal?: AbortSignal) => {
    const { data } = await axiosInstance.get<PortfolioItemDTO[]>(
        "/api/v1/users/portfolio-items",
        { signal },
    );

    return data;
};

export const getUserPortfolioItemsQueryKey = (userId?: string) =>
    ["/api/v1/users", userId, "portfolio-items"] as const;

export const getUserPortfolioItems = async (
    userId: string,
    signal?: AbortSignal,
) => {
    const { data } = await axiosInstance.get<PortfolioItemDTO[]>(
        `/api/v1/users/${userId}/portfolio-items`,
        { signal },
    );

    return data;
};

export const getMyProfileQueryKey = () => ["/api/v1/users/profile"] as const;

export const getMyProfile = async (signal?: AbortSignal) => {
    const { data } = await axiosInstance.get<UserProfileDTO>(
        "/api/v1/users/profile",
        { signal },
    );

    return data;
};

export const updateMyProfile = async (data: UpdateUserProfileSchema) => {
    const response = await axiosInstance.patch<UserProfileDTO>(
        "/api/v1/users/profile",
        data,
    );

    return response.data;
};

export const getMySkillsQueryKey = () => ["/api/v1/users/skills"] as const;

export const getMySkills = async (signal?: AbortSignal) => {
    const { data } = await axiosInstance.get<
        Array<{
            id: string;
            name: string;
        }>
    >("/api/v1/users/skills", { signal });

    return data;
};

export const replaceMySkills = async (data: ReplaceUserSkillsSchema) => {
    const response = await axiosInstance.put<
        Array<{
            id: string;
            name: string;
        }>
    >("/api/v1/users/skills", data);

    return response.data;
};
