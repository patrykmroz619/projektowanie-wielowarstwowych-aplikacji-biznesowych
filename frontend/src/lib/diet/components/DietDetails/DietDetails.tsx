"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer, Download, Info, Heart } from "lucide-react";
import { DietDetails as DietDetailsType } from "../../types/diet.type";

const recommendations = [
  "Pij minimum 2 litry wody dziennie",
  "Staraj się jeść posiłki o regularnych porach",
  "Ogranicz spożycie soli i cukru",
  "Wybieraj produkty pełnoziarniste zamiast przetworzonych",
  "Pamiętaj o regularnej aktywności fizycznej",
];

interface IDietDetailsProps {
  diet: DietDetailsType;
}

export function DietDetails(props: IDietDetailsProps) {
  // TODO: Replace sample diet with diet from API when backend will be ready
  const { diet: dietFromApi } = props;
  console.log("Dieta z API:", dietFromApi);
  const diet = dietFromApi;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Logika eksportu do PDF lub innego formatu
    alert("Funkcja eksportu do PDF zostanie zaimplementowana");
  };

  return (
    <main className="flex-1 container mx-auto py-6">
      <div className="flex flex-col gap-8">
        <section className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{diet.title}</h1>
            <p className="text-muted-foreground">
              Plan żywieniowy dostosowany do Twoich potrzeb i preferencji.
            </p>
          </div>
          <div className="flex gap-2 print:hidden">
            <Button
              variant="outline"
              onClick={() => {
                window.alert(
                  "Funkcja dodawania do ulubionych zostanie zaimplementowana"
                );
              }}
            >
              <Heart className="mr-2 h-4 w-4" />
              <span className="hidden md:block">Dodaj do ulubionych</span>
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              <span className="hidden md:block">Drukuj</span>
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              <span className="hidden md:block">Pobierz PDF</span>
            </Button>
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Podsumowanie diety</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 print:grid-cols-5 gap-4">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">
                    Kalorie
                  </span>
                  <span className="text-2xl font-bold">
                    {diet.summary.calories}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    kcal/dzień
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">
                    Białko
                  </span>
                  <span className="text-2xl font-bold">
                    {diet.summary.protein}g
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(
                      ((diet.summary.protein * 4) / diet.summary.calories) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">
                    Węglowodany
                  </span>
                  <span className="text-2xl font-bold">
                    {diet.summary.carbs}g
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(
                      ((diet.summary.carbs * 4) / diet.summary.calories) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">
                    Tłuszcze
                  </span>
                  <span className="text-2xl font-bold">
                    {diet.summary.fat}g
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(
                      ((diet.summary.fat * 9) / diet.summary.calories) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">
                    Posiłki
                  </span>
                  <span className="text-2xl font-bold">
                    {diet.summary.meals}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    dziennie
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="space-y-6">
            {diet.meals.map((meal, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-2 justify-between items-center">
                    <div>
                      <CardTitle className="text-xl">{meal.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {meal.time}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{meal.calories} kcal</Badge>
                      <Badge variant="outline">B: {meal.protein}g</Badge>
                      <Badge variant="outline">W: {meal.carbs}g</Badge>
                      <Badge variant="outline">T: {meal.fat}g</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center">
                    <span className="font-medium">{meal.recipe.name}</span>
                    <Badge className="ml-2" variant="secondary">
                      {meal.recipe.difficulty}
                    </Badge>
                    <Badge className="ml-2" variant="secondary">
                      {meal.recipe.prepTime}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Składniki:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {meal.recipe.ingredients.map((ingredient, i) => (
                          <li key={i} className="text-sm">
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">
                        Sposób przygotowania:
                      </h4>
                      <p className="text-sm">{meal.recipe.instructions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5" />
                Zalecenia i wskazówki
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
