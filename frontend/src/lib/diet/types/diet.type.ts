export type Diet = {
  caloric_intake: number;
  diet_goal: string;
  diet_type: string;
  generated_json: string;
  id: string;
  meals_per_day: number;
  user_id: string;
};

export type DietDetails = {
  title: string;
  summary: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meals: number;
  };
  meals: {
    name: string;
    time: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    recipe: {
      name: string;
      ingredients: string[];
      instructions: string;
      difficulty: string;
      prepTime: string;
    };
  }[];
};
