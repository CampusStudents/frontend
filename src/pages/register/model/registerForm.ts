import { type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const registerSchema = z
    .object({
        role: z.enum(["participant", "organizer"]),
        email: z.string().email("Введите корректный email"),
        fullName: z.string().trim().min(1, "Введите ФИО"),
        gender: z
            .enum(["", "male", "female"])
            .refine((value) => value !== "", "Выберите пол"),
        age: z
            .string()
            .trim()
            .min(1, "Введите возраст")
            .refine(
                (value) => /^\d+$/.test(value),
                "Возраст должен быть числом",
            )
            .refine((value) => {
                const age = Number(value);
                return age >= 14 && age <= 120;
            }, "Возраст должен быть от 14 до 120"),
        city: z.string().trim().min(1, "Введите город"),
        password: z
            .string()
            .min(8, "Пароль должен содержать минимум 8 символов"),
        confirmPassword: z.string().min(1, "Повторите пароль"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Пароли не совпадают",
    });

export type RegisterFormValues = z.input<typeof registerSchema>;

export const registerDefaultValues: RegisterFormValues = {
    role: "participant",
    email: "",
    fullName: "",
    gender: "",
    age: "",
    city: "",
    password: "",
    confirmPassword: "",
};

export const registerResolver = zodResolver(
    registerSchema,
) as Resolver<RegisterFormValues>;
