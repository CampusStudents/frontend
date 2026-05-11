import { type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const profileSetupSchema = z.object({
    firstName: z.string().trim().min(1, "Введите имя"),
    lastName: z.string().trim().min(1, "Введите фамилию"),
    cityId: z.string().trim().min(1, "Выберите город"),
    universityId: z.string().trim().min(1, "Выберите вуз"),
    bio: z.string().trim(),
});

export type ProfileSetupFormValues = z.input<typeof profileSetupSchema>;

export const profileSetupDefaultValues: ProfileSetupFormValues = {
    firstName: "",
    lastName: "",
    cityId: "",
    universityId: "",
    bio: "",
};

export const profileSetupResolver = zodResolver(
    profileSetupSchema,
) as Resolver<ProfileSetupFormValues>;
