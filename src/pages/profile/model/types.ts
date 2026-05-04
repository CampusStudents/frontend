export type ProfileDetails = {
    initials: string;
    fullName: string;
    role: string;
    city: string;
    format: string;
    university: string;
    bio: string;
    email: string;
    telegram: string;
    portfolio: string;
};

export type ProfileStat = {
    label: string;
    value: string;
};

export type ProfileTimelineItem = {
    title: string;
    period: string;
    description: string;
};
