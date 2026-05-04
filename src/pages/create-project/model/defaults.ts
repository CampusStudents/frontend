import type { TeamRole } from "./types";

export const createDefaultTeamRole = (): TeamRole => ({
    id: Date.now() + Math.floor(Math.random() * 1000),
    role: "Frontend",
    description:
        "Нужен участник, который поможет собрать интерфейсы, поддержать текущую архитектуру и довести сценарии до рабочего состояния.",
    tags: ["React", "Next", "TypeScript"],
});

export const createEmptyTeamRole = (): TeamRole => ({
    ...createDefaultTeamRole(),
    role: "",
    description: "",
    tags: [],
});
