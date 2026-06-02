export type TeamRole = {
    id: number;
    role: string;
    requiredCount: number;
    description: string;
    skillIds: string[];
};

export type TeamRoleErrors = {
    role?: string;
    requiredCount?: string;
};
