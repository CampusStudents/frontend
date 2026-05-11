import { type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const registerAccountSchema = z
    .object({
        email: z.string().email("Введите корректный email"),
        password: z
            .string()
            .min(8, "Пароль должен содержать минимум 8 символов"),
        confirmPassword: z.string().min(1, "Повторите пароль"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Пароли не совпадают",
    });

export type RegisterAccountFormValues = z.input<typeof registerAccountSchema>;

export const registerAccountDefaultValues: RegisterAccountFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
};

export const registerAccountResolver = zodResolver(
    registerAccountSchema,
) as Resolver<RegisterAccountFormValues>;
