export type LoginPromptVariant = "subscribe" | "createProject" | null;

export type LoginPromptContent = {
    title: string;
    description: string;
};

export type EventToastData = {
    title: string;
    message: string;
};
