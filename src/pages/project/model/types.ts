export type ProjectDetails = {
    eventId: number;
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
    linkLabel: string;
    galleryTitle: string;
    heroImage: string;
    gallery: string[];
};

export type ProjectRequirement = {
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
