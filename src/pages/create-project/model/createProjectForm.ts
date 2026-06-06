import { type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ProjectFormat, ProjectType } from "@shared/api/generated/model";

export const createProjectSchema = z.object({
    title: z.string().trim().min(1, "Введите название проекта"),
    deadline: z.string().trim().optional(),
    description: z.string().trim().min(1, "Добавьте описание проекта"),
    cityId: z.string().trim().min(1, "Выберите город"),
    eventId: z.string().trim().optional(),
    format: z.enum(ProjectFormat, {
        error: "Выберите формат проекта",
    }),
    type: z.enum(ProjectType, {
        error: "Выберите тип проекта",
    }),
});

export type CreateProjectFormValues = z.input<typeof createProjectSchema>;

export const createProjectDefaultValues: CreateProjectFormValues = {
    title: "",
    deadline: "",
    description: "",
    cityId: "",
    eventId: "",
    format: ProjectFormat.online,
    type: ProjectType.study,
};

export const createProjectResolver = zodResolver(
    createProjectSchema,
) as Resolver<CreateProjectFormValues>;
