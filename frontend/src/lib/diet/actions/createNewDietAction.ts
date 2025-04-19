"use server";

import { getUser } from "@/lib/auth";
import { DietFormValues } from "../schema/dietSchema";
import { dietService } from "../services/dietService";

export async function createNewDietAction(formData: DietFormValues) {
  try {
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        error: "User ID is required",
      };
    }

    // Call the diet service to create the diet
    const result = await dietService.createDiet(user.id, formData);

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to create diet:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
