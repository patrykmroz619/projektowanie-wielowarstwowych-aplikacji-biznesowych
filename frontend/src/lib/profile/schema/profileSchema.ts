import { z } from "zod";

export const profileSchema = z.object({
  age: z.coerce.number().min(1, { message: "Wiek musi być większy niż 0" }),
  gender: z.enum(["male", "female"], { message: "Proszę wybrać płeć" }),
  weight: z.coerce.number().min(1, "Waga musi być większa niż 0"),
  height: z.coerce.number().min(1, "Wzrost musi być większy niż 0"),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "veryActive"], {
    message: "Proszę wybrać poziom aktywności",
  }),
});

export type TProfileSchema = z.infer<typeof profileSchema>;
