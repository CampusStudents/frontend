import type { MyProjectCardData, ProjectCardData } from "../model/types";

type CardWithEvent = Pick<
    ProjectCardData,
    "destination" | "eventId" | "eventTitle"
>;

export const resolveCardEvent = (card: CardWithEvent) => ({
    eventId: card.eventId ?? null,
    eventTitle:
        card.eventTitle ?? card.destination ?? "Мероприятие не привязано",
});

export const resolveMyCardEvent = (card: MyProjectCardData) =>
    resolveCardEvent(card);
