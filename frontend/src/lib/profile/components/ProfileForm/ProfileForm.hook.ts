import { toast } from "sonner";
import { saveProfileForLoggedUserAction } from "../../actions/saveProfileForLoggedUserAction";
import { profileSchema, TProfileSchema } from "../../schema/profileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const defaultFormValues: TProfileSchema = {
  age: 0,
  gender: "male",
  weight: 0,
  height: 0,
  activityLevel: "sedentary",
};

export const useProfileForm = (userProfile: TProfileSchema | null) => {
  const form = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: userProfile ?? defaultFormValues,
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (profile: TProfileSchema) => {
    try {
      setIsLoading(true);
      await saveProfileForLoggedUserAction({ profile });
      toast.success("Profil został pomyślnie zapisany.");
    } catch (error) {
      toast.error(`Błąd podczas zapisywania profilu: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, onSubmit };
};
