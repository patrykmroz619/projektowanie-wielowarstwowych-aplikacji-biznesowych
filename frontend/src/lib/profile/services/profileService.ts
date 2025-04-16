import axios from "axios";
import { TProfileSchema } from "../schema/profileSchema";

const profileApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interface IGetProfileParams {
  userId: string;
}

const getProfile = async (params: IGetProfileParams) => {
  const { userId } = params;
  const response = await profileApi.get(`/profile/${userId}`);
  return response.data;
};

interface ISaveProfileParams {
  userId: string;
  profile: TProfileSchema;
}

const saveProfile = async (params: ISaveProfileParams) => {
  const { userId, profile } = params;
  await profileApi.put(`/profile/${userId}`, profile);
};

export const profileService = { getProfile, saveProfile };
