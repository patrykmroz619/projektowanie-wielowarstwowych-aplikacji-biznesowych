import { z } from "zod";

export const dietFormSchema = z.object({
  dietGoal: z.enum(["reduction", "maintenance", "muscleGain", "healthyEating"], {
    message: "Proszę wybrać cel diety",
  }),
  dietType: z.enum(["standard", "vegetarian", "vegan", "ketogenic", "lowCarb", "highProtein"], {
    message: "Proszę wybrać rodzaj diety",
  }),
  allergies: z.string().optional(),
  excludedProducts: z.string().optional(),
  favoriteProducts: z.string().optional(),
  caloricIntake: z.coerce.number().optional(),
  macroRatios: z.string().optional(),
  mealsPerDay: z.coerce.number().min(1, "Liczba posiłków musi być większa niż 0"),
  recipeDifficulty: z.enum(["easy", "medium", "advanced"], {
    message: "Proszę wybrać poziom trudności",
  }),
  prepTime: z.string().optional(),
});

export type DietFormValues = z.infer<typeof dietFormSchema>;
