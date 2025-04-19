import axios from "axios";
import { DietFormValues } from "../schema/dietSchema";

interface CreateDietRequest {
  dietGoal: string;
  dietType: string;
  caloricIntake?: number;
  mealsPerDay: number;
  // Other relevant fields from the form
}

interface CreateDietResponse {
  id: string;
  // Add other response properties as needed
}

const dietApi = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export const dietService = {
  /**
   * Creates a new diet plan based on the provided data
   */
  createDiet: async (userId: string, formData: DietFormValues): Promise<CreateDietResponse> => {
    const requestData: CreateDietRequest = {
      dietGoal: formData.dietGoal,
      dietType: formData.dietType,
      caloricIntake: formData.caloricIntake,
      mealsPerDay: formData.mealsPerDay,
    };

    const response = await dietApi.post(`/diet/${userId}/new`, requestData);

    if (!response.data) {
      throw new Error("Failed to create diet");
    }

    return response.data;
  },
};
