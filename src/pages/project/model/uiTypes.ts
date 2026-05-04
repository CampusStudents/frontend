export type ProjectLoginPromptVariant = "participation" | "favorites" | null;

export type ProjectLoginPromptContent = {
    title: string;
    description: string;
};

export type ProjectToastState = "closed" | "open" | "closing";

export type ProjectToastData = {
    title: string;
    message: string;
};
