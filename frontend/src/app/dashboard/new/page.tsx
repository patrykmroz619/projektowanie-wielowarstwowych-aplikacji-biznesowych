"use client";
import { z } from "zod";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  age: z.coerce.number().min(1, { message: "Wiek musi być większy niż 0" }),
  gender: z.enum(["male", "female"], { message: "Proszę wybrać płeć" }),
  weight: z.coerce.number().min(1, "Waga musi być większa niż 0"),
  height: z.coerce.number().min(1, "Wzrost musi być większy niż 0"),
  activityLevel: z.enum(
    ["sedentary", "light", "moderate", "active", "veryActive"],
    {
      message: "Proszę wybrać poziom aktywności",
    }
  ),
  dietGoal: z.enum(
    ["reduction", "maintenance", "muscleGain", "healthyEating"],
    {
      message: "Proszę wybrać cel diety",
    }
  ),
  dietType: z.enum(
    ["standard", "vegetarian", "vegan", "ketogenic", "lowCarb", "highProtein"],
    {
      message: "Proszę wybrać rodzaj diety",
    }
  ),
  allergies: z.string().optional(),
  excludedProducts: z.string().optional(),
  favoriteProducts: z.string().optional(),
  caloricIntake: z.coerce.number().optional(),
  macroRatios: z.string().optional(),
  mealsPerDay: z.coerce
    .number()
    .min(1, "Liczba posiłków musi być większa niż 0"),
  recipeDifficulty: z.enum(["easy", "medium", "advanced"], {
    message: "Proszę wybrać poziom trudności",
  }),
  prepTime: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const NewDietPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    // Handle form submission logic here
    console.log(data);
    router.push("/dashboard/list/idOfTheRecordInDB");
  };

  return (
    <main className="flex-1 container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <section>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Stwórz nową dietę
            </h1>
            <p className="text-muted-foreground">
              Wypełnij poniższy formularz, aby stworzyć spersonalizowany plan
              żywieniowy.
            </p>
          </div>
        </section>

        <section>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Dane podstawowe</h2>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                          <SelectItem value="veryActive">
                            Bardzo aktywny
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dietGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cel diety</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Wybierz cel diety" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="reduction">Redukcja</SelectItem>
                          <SelectItem value="maintenance">
                            Utrzymanie wagi
                          </SelectItem>
                          <SelectItem value="muscleGain">
                            Budowa masy mięśniowej
                          </SelectItem>
                          <SelectItem value="healthyEating">
                            Zdrowe odżywianie
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold">Preferencje żywieniowe</h2>
                <FormField
                  control={form.control}
                  name="dietType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rodzaj diety</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Wybierz rodzaj diety" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="standard">Standardowa</SelectItem>
                          <SelectItem value="vegetarian">
                            Wegetariańska
                          </SelectItem>
                          <SelectItem value="vegan">Wegańska</SelectItem>
                          <SelectItem value="ketogenic">
                            Ketogeniczna
                          </SelectItem>
                          <SelectItem value="lowCarb">
                            Niskowęglowodanowa
                          </SelectItem>
                          <SelectItem value="highProtein">
                            Wysokobiałkowa
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nietolerancje i alergie</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excludedProducts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produkty do wykluczenia</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="favoriteProducts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ulubione produkty</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold">
                  Szczegóły kaloryczne i makroskładniki
                </h2>
                <FormField
                  control={form.control}
                  name="caloricIntake"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Docelowa kaloryczność</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="macroRatios"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Preferowane proporcje makroskładników
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold">Inne wymagania</h2>
                <FormField
                  control={form.control}
                  name="mealsPerDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Liczba posiłków dziennie</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipeDifficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poziom trudności przepisów</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Wybierz poziom trudności" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="easy">Łatwy</SelectItem>
                          <SelectItem value="medium">Średni</SelectItem>
                          <SelectItem value="advanced">Zaawansowany</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prepTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Czas na przygotowanie posiłków</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Stwórz dietę
              </Button>
            </form>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default NewDietPage;
