"use server";

import { dietService } from "../services/dietService";

export async function getDietDetails(dietId: string) {
  try {
    const diet = await dietService.getDiet(dietId);

    return diet;
  } catch (error) {
    console.error("Failed to get diet:", error);
    return null;
  }
}
