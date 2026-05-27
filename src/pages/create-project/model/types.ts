export type TeamRole = {
    id: number;
    role: string;
    description: string;
    tags: string[];
};

export type TeamRoleErrors = {
    role?: string;
};
