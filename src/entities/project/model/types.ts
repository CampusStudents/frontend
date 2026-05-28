export type ProjectCardData = {
    id: string | number;
    date: string;
    title: string;
    destination: string;
    eventId: string | null;
    eventTitle: string;
    subtitle: string;
    description: string;
    meta: string;
    members: string;
};

export type MyProjectCardData = {
    id: string | number;
    date: string;
    weekday: string;
    title: string;
    destination: string;
    eventId: string | null;
    eventTitle: string;
    subtitle: string;
    description: string;
    meta: string;
    members: string;
};

export type CandidatesCardData = {
    id: string | number;
    name: string;
    age?: number;
    about: string;
    city: string;
    role?: string;
    status?: string;
};
