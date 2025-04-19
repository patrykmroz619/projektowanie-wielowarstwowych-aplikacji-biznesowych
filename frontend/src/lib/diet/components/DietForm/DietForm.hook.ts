"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DietFormValues, dietFormSchema } from "../../schema/dietSchema";
import { createNewDietAction } from "../../actions/createNewDietAction";

export function useDietForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DietFormValues>({
    resolver: zodResolver(dietFormSchema),
    defaultValues: {
      mealsPerDay: 3,
      caloricIntake: 2000,
      dietGoal: "maintenance",
      dietType: "standard",
      recipeDifficulty: "easy",
    },
  });

  const onSubmit = async (data: DietFormValues) => {
    setIsSubmitting(true);

    try {
      const result = await createNewDietAction(data);

      if (!result.success || !result.data) {
        throw new Error(result.error || "Błąd zapisu diety");
      }

      toast.success("Dieta została pomyślnie utworzona");
      router.push(`/dashboard/list/${result.data.id}`);
    } catch (error) {
      console.error("Nie udało się zapisać diety:", error);
      toast.error(error instanceof Error ? error.message : "Nieznany błąd");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
  };
}
