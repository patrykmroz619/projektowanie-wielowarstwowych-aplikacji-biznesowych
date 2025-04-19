"use client";

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
import { useDietForm } from "./DietForm.hook";

export function DietForm() {
  const { form, onSubmit, isSubmitting } = useDietForm();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Dane podstawowe</h2>
          <FormField
            control={form.control}
            name="dietGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cel diety</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz cel diety" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="reduction">Redukcja</SelectItem>
                    <SelectItem value="maintenance">Utrzymanie wagi</SelectItem>
                    <SelectItem value="muscleGain">Budowa masy mięśniowej</SelectItem>
                    <SelectItem value="healthyEating">Zdrowe odżywianie</SelectItem>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz rodzaj diety" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="standard">Standardowa</SelectItem>
                    <SelectItem value="vegetarian">Wegetariańska</SelectItem>
                    <SelectItem value="vegan">Wegańska</SelectItem>
                    <SelectItem value="ketogenic">Ketogeniczna</SelectItem>
                    <SelectItem value="lowCarb">Niskowęglowodanowa</SelectItem>
                    <SelectItem value="highProtein">Wysokobiałkowa</SelectItem>
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
          <h2 className="text-xl font-bold">Szczegóły kaloryczne i makroskładniki</h2>
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
                <FormLabel>Preferowane proporcje makroskładników</FormLabel>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Tworzenie..." : "Stwórz dietę"}
        </Button>
      </form>
    </Form>
  );
}
