"use server";

import { getUser } from "@/lib/auth";
import { dietService } from "../services/dietService";

export async function getUserDiets() {
  try {
    const user = await getUser();
    if (!user) {
      return null;
    }

    const diets = await dietService.getDietList(user.id);

    return diets;
  } catch (error) {
    console.error("Failed to create diet:", error);
    return null;
  }
}
