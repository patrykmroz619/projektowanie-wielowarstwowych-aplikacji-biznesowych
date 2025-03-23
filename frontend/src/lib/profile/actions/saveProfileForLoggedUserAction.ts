"use server";

import { getUser } from "@/lib/auth";
import { profileService } from "../services/profileService";
import { TProfileSchema } from "../schema/profileSchema";

interface ISaveProfileForLoggedUserActionParams {
  profile: TProfileSchema;
}

export const saveProfileForLoggedUserAction = async (
  params: ISaveProfileForLoggedUserActionParams
) => {
  try {
    const { profile } = params;

    const user = await getUser();
    if (!user) {
      return null;
    }
    await profileService.saveProfile({ userId: user.id, profile });
  } catch (error) {
    console.error("Failed to save profile for logged user:", error);
  }
};
