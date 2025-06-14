import { dietFormSchema, DietFormValues } from "./dietSchema";
import { z } from "zod";

describe("dietFormSchema", () => {
  it("should validate a correct diet form object with all required fields", () => {
    const validDiet = {
      dietGoal: "reduction" as const,
      dietType: "standard" as const,
      mealsPerDay: 3,
      recipeDifficulty: "easy" as const,
    };

    const result = dietFormSchema.parse(validDiet);
    expect(result).toEqual(validDiet);
  });

  it("should validate a complete diet form object with all optional fields", () => {
    const completeDiet = {
      dietGoal: "muscleGain" as const,
      dietType: "highProtein" as const,
      allergies: "nuts, shellfish",
      excludedProducts: "dairy",
      favoriteProducts: "chicken, rice",
      caloricIntake: 2500,
      macroRatios: "40/30/30",
      mealsPerDay: 5,
      recipeDifficulty: "advanced" as const,
      prepTime: "30-45 minutes",
    };

    const result = dietFormSchema.parse(completeDiet);
    expect(result).toEqual(completeDiet);
  });

  it("should coerce string numbers to numbers for mealsPerDay and caloricIntake", () => {
    const dietWithStringNumbers = {
      dietGoal: "maintenance" as const,
      dietType: "vegetarian" as const,
      mealsPerDay: "4",
      caloricIntake: "2000",
      recipeDifficulty: "medium" as const,
    };

    const result = dietFormSchema.parse(dietWithStringNumbers);
    expect(result.mealsPerDay).toBe(4);
    expect(result.caloricIntake).toBe(2000);
    expect(typeof result.mealsPerDay).toBe("number");
    expect(typeof result.caloricIntake).toBe("number");
  });

  it("should fail validation when dietGoal is invalid", () => {
    const invalidDiet = {
      dietGoal: "invalid" as any,
      dietType: "standard" as const,
      mealsPerDay: 3,
      recipeDifficulty: "easy" as const,
    };

    const result = dietFormSchema.safeParse(invalidDiet);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Proszę wybrać cel diety");
    }
  });

  it("should fail validation when dietType is invalid", () => {
    const invalidDiet = {
      dietGoal: "reduction" as const,
      dietType: "invalid" as any,
      mealsPerDay: 3,
      recipeDifficulty: "easy" as const,
    };

    const result = dietFormSchema.safeParse(invalidDiet);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Proszę wybrać rodzaj diety");
    }
  });

  it("should fail validation when mealsPerDay is 0 or negative", () => {
    const invalidDiet = {
      dietGoal: "reduction" as const,
      dietType: "standard" as const,
      mealsPerDay: 0,
      recipeDifficulty: "easy" as const,
    };

    const result = dietFormSchema.safeParse(invalidDiet);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Liczba posiłków musi być większa niż 0");
    }
  });

  it("should fail validation when recipeDifficulty is invalid", () => {
    const invalidDiet = {
      dietGoal: "reduction" as const,
      dietType: "standard" as const,
      mealsPerDay: 3,
      recipeDifficulty: "invalid" as any,
    };

    const result = dietFormSchema.safeParse(invalidDiet);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Proszę wybrać poziom trudności");
    }
  });

  it("should validate all valid diet goals", () => {
    const dietGoals = ["reduction", "maintenance", "muscleGain", "healthyEating"] as const;

    dietGoals.forEach((goal) => {
      const validDiet = {
        dietGoal: goal,
        dietType: "standard" as const,
        mealsPerDay: 3,
        recipeDifficulty: "easy" as const,
      };

      const result = dietFormSchema.safeParse(validDiet);
      expect(result.success).toBe(true);
    });
  });

  it("should validate all valid diet types", () => {
    const dietTypes = [
      "standard",
      "vegetarian",
      "vegan",
      "ketogenic",
      "lowCarb",
      "highProtein",
    ] as const;

    dietTypes.forEach((type) => {
      const validDiet = {
        dietGoal: "reduction" as const,
        dietType: type,
        mealsPerDay: 3,
        recipeDifficulty: "easy" as const,
      };

      const result = dietFormSchema.safeParse(validDiet);
      expect(result.success).toBe(true);
    });
  });

  it("should validate all valid recipe difficulties", () => {
    const difficulties = ["easy", "medium", "advanced"] as const;

    difficulties.forEach((difficulty) => {
      const validDiet = {
        dietGoal: "reduction" as const,
        dietType: "standard" as const,
        mealsPerDay: 3,
        recipeDifficulty: difficulty,
      };

      const result = dietFormSchema.safeParse(validDiet);
      expect(result.success).toBe(true);
    });
  });

  it("should handle optional fields correctly when not provided", () => {
    const minimalDiet = {
      dietGoal: "reduction" as const,
      dietType: "standard" as const,
      mealsPerDay: 3,
      recipeDifficulty: "easy" as const,
    };

    const result = dietFormSchema.parse(minimalDiet);
    expect(result.allergies).toBeUndefined();
    expect(result.excludedProducts).toBeUndefined();
    expect(result.favoriteProducts).toBeUndefined();
    expect(result.caloricIntake).toBeUndefined();
    expect(result.macroRatios).toBeUndefined();
    expect(result.prepTime).toBeUndefined();
  });

  it("should have correct TypeScript type inference", () => {
    // This test ensures the type is correctly inferred
    const validDiet: DietFormValues = {
      dietGoal: "reduction",
      dietType: "standard",
      mealsPerDay: 3,
      recipeDifficulty: "easy",
      allergies: "none",
      excludedProducts: "none",
      favoriteProducts: "chicken",
      caloricIntake: 2000,
      macroRatios: "40/30/30",
      prepTime: "30 minutes",
    };

    const result = dietFormSchema.parse(validDiet);
    expect(result).toEqual(validDiet);
  });
});
