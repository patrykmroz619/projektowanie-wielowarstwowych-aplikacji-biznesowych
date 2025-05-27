import axios from "axios";
import { DietFormValues } from "../schema/dietSchema";
import { Diet } from "../types/diet.type";

interface CreateDietResponse {
  id: string;
}

const dietApi = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export const dietService = {
  createDiet: async (userId: string, formData: DietFormValues): Promise<CreateDietResponse> => {
    const response = await dietApi.post(`/diet/new`, {
      userId,
      ...formData,
    });

    if (!response.data) {
      throw new Error("Failed to create diet");
    }

    return response.data;
  },
  getDiet: async (dietId: string) => {
    const response = await dietApi.get<{ data: Diet }>(`/diet/detail/${dietId}`);
    return response.data.data;
  },
  getDietList: async (userId: string) => {
    const response = await dietApi.get<Diet[]>(`/diet/list/${userId}`);
    return response.data;
  },
};
