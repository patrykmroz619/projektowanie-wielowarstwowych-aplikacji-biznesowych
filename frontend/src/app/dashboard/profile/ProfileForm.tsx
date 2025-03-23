"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { profileSchema, TProfileSchema } from "@/lib/profile/schema/profileSchema";
import { saveProfileForLoggedUserAction } from "@/lib/profile/actions/saveProfileForLoggedUserAction";

const defaultFormValues: TProfileSchema = {
  age: 0,
  gender: "male",
  weight: 0,
  height: 0,
  activityLevel: "sedentary",
};

interface IProfileFormProps {
  userProfile: TProfileSchema | null;
}

const ProfileForm = (props: IProfileFormProps) => {
  const { userProfile } = props;

  const form = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: userProfile ?? defaultFormValues,
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (profile: TProfileSchema) => {
    try {
      setIsLoading(true);
      await saveProfileForLoggedUserAction({ profile });
    } catch (error) {
      // TODO: Add toast notifications
      console.error("Failed to save profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wiek</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Płeć</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz płeć" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Mężczyzna</SelectItem>
                    <SelectItem value="female">Kobieta</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waga (kg)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wzrost (cm)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poziom aktywności fizycznej</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz poziom aktywności" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedentary">Siedzący</SelectItem>
                    <SelectItem value="light">Lekko aktywny</SelectItem>
                    <SelectItem value="moderate">Umiarkowany</SelectItem>
                    <SelectItem value="active">Aktywny</SelectItem>
                    <SelectItem value="veryActive">Bardzo aktywny</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          Zaktualizuj profil
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
