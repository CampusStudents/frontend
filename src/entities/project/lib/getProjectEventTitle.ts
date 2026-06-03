import type { ProjectDTO } from "@shared/api/generated/model";

const EVENT_TITLE_FALLBACK = "Связанное мероприятие";
const EVENT_TITLE_MISSING = "Мероприятие не привязано";

export const getProjectEventTitle = (
    project: ProjectDTO,
    eventsById?: Record<string, string>,
): string => {
    if (!project.event_id) {
        return EVENT_TITLE_MISSING;
    }

    return eventsById?.[project.event_id] ?? EVENT_TITLE_FALLBACK;
};

export const getProjectEventId = (project: ProjectDTO): string | null =>
    project.event_id ?? null;
