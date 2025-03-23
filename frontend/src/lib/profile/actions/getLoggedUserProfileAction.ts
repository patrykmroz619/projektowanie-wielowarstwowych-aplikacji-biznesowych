"use server";

import { getUser } from "@/lib/auth";
import { profileService } from "../services/profileService";

export const getLoggedUserProfileAction = async () => {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    const userProfile = await profileService.getProfile({ userId: user.id });

    return userProfile;
  } catch (error) {
    console.error("Failed to get logged user profile:", error);
    return null;
  }
};
