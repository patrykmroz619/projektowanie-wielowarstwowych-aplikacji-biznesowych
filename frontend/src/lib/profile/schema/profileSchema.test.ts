import { profileSchema, TProfileSchema } from "./profileSchema";
import { z } from "zod";

describe("profileSchema", () => {
  it("should validate a correct profile object", () => {
    const validProfile = {
      dob: "1990-01-01",
      gender: "male" as const,
      weight: 70,
      height: 180,
      activityLevel: "moderate" as const,
    };

    const result = profileSchema.parse(validProfile);
    expect(result).toEqual(validProfile);
  });

  it("should coerce string numbers to numbers for weight and height", () => {
    const profileWithStringNumbers = {
      dob: "1990-01-01",
      gender: "female" as const,
      weight: "65",
      height: "170",
      activityLevel: "light" as const,
    };

    const result = profileSchema.parse(profileWithStringNumbers);
    expect(result.weight).toBe(65);
    expect(result.height).toBe(170);
    expect(typeof result.weight).toBe("number");
    expect(typeof result.height).toBe("number");
  });

  it("should fail validation when dob is empty", () => {
    const invalidProfile = {
      dob: "",
      gender: "male" as const,
      weight: 70,
      height: 180,
      activityLevel: "moderate" as const,
    };

    expect(() => profileSchema.parse(invalidProfile)).toThrow();

    const result = profileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Proszę podać datę urodzenia");
    }
  });

  it("should fail validation when gender is invalid", () => {
    const invalidProfile = {
      dob: "1990-01-01",
      gender: "other" as any,
      weight: 70,
      height: 180,
      activityLevel: "moderate" as const,
    };

    const result = profileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Proszę wybrać płeć");
    }
  });

  it("should fail validation when weight is 0 or negative", () => {
    const invalidProfile = {
      dob: "1990-01-01",
      gender: "male" as const,
      weight: 0,
      height: 180,
      activityLevel: "moderate" as const,
    };

    const result = profileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Waga musi być większa niż 0");
    }
  });

  it("should fail validation when height is 0 or negative", () => {
    const invalidProfile = {
      dob: "1990-01-01",
      gender: "female" as const,
      weight: 65,
      height: 0,
      activityLevel: "light" as const,
    };

    const result = profileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Wzrost musi być większy niż 0");
    }
  });

  it("should fail validation when activityLevel is invalid", () => {
    const invalidProfile = {
      dob: "1990-01-01",
      gender: "male" as const,
      weight: 70,
      height: 180,
      activityLevel: "invalid" as any,
    };

    const result = profileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Proszę wybrać poziom aktywności");
    }
  });

  it("should validate all valid activity levels", () => {
    const activityLevels = ["sedentary", "light", "moderate", "active", "veryActive"] as const;

    activityLevels.forEach((level) => {
      const validProfile = {
        dob: "1990-01-01",
        gender: "male" as const,
        weight: 70,
        height: 180,
        activityLevel: level,
      };

      const result = profileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });
  });

  it("should validate both genders", () => {
    const genders = ["male", "female"] as const;

    genders.forEach((gender) => {
      const validProfile = {
        dob: "1990-01-01",
        gender: gender,
        weight: 70,
        height: 180,
        activityLevel: "moderate" as const,
      };

      const result = profileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });
  });

  it("should have correct TypeScript type inference", () => {
    // This test ensures the type is correctly inferred
    const validProfile: TProfileSchema = {
      dob: "1990-01-01",
      gender: "male",
      weight: 70,
      height: 180,
      activityLevel: "moderate",
    };

    const result = profileSchema.parse(validProfile);
    expect(result).toEqual(validProfile);
  });
});
