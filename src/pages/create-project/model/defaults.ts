import type { TeamRole } from "./types";

export const createDefaultTeamRole = (): TeamRole => ({
    id: Date.now() + Math.floor(Math.random() * 1000),
    role: "",
    requiredCount: 1,
    description:
        "Нужен участник, который поможет собрать интерфейсы, поддержать текущую архитектуру и довести сценарии до рабочего состояния.",
    skillIds: [],
});

export const createEmptyTeamRole = (): TeamRole => ({
    ...createDefaultTeamRole(),
    description: "",
});
