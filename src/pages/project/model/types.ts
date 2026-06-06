export type ProjectDetails = {
    eventId: string | number | null;
    dateDay: string;
    dateMonth: string;
    title: string;
    organizer: string;
    venue: string;
    address: string;
    actionLabel: string;
    aboutLabel: string;
    description: string[];
    requirementsTitle: string;
    requirementsFooter: string;
    eventTitle: string;
    eventDescription: string[];
    eventOrganizer: string;
    eventDate: string;
    eventFormat: string;
    eventRegistrationLink: string | null;
    linkLabel: string;
    galleryTitle: string;
    gallery: string[];
};

export type ProjectRequirement = {
    vacancyId: string;
    title: string;
    description: string;
    stack: string;
};

export type ProjectCandidate = {
    id: number;
    name: string;
    role: string;
    summary: string;
    skills: string[];
    image: string;
};
