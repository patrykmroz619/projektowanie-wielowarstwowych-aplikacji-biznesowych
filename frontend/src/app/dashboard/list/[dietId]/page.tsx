"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer, Download, Info, Heart } from "lucide-react";

const recommendations = [
  "Pij minimum 2 litry wody dziennie",
  "Staraj się jeść posiłki o regularnych porach",
  "Ogranicz spożycie soli i cukru",
  "Wybieraj produkty pełnoziarniste zamiast przetworzonych",
  "Pamiętaj o regularnej aktywności fizycznej",
];

// Przykładowe dane diety - w rzeczywistości będą pochodzić z odpowiedzi API
const sampleDiet = {
  title: "Przykładowa dieta",
  summary: {
    calories: 2200,
    protein: 120,
    carbs: 220,
    fat: 73,
    meals: 5,
  },
  meals: [
    {
      name: "Śniadanie",
      time: "7:00 - 8:00",
      calories: 450,
      protein: 25,
      carbs: 45,
      fat: 15,
      recipe: {
        name: "Owsianka z owocami i orzechami",
        ingredients: [
          "50g płatków owsianych",
          "200ml mleka 2%",
          "1 banan",
          "garść jagód",
          "15g orzechów włoskich",
          "5g miodu",
        ],
        instructions:
          "1. Zagotuj mleko. 2. Dodaj płatki owsiane i gotuj 3-4 minuty. 3. Przełóż do miski i dodaj pokrojonego banana, jagody, orzechy i miód.",
        difficulty: "Łatwy",
        prepTime: "10 minut",
      },
    },
    {
      name: "Drugie śniadanie",
      time: "10:30 - 11:00",
      calories: 300,
      protein: 15,
      carbs: 30,
      fat: 10,
      recipe: {
        name: "Kanapka z indykiem i warzywami",
        ingredients: [
          "2 kromki chleba pełnoziarnistego",
          "80g piersi z indyka",
          "Liść sałaty",
          "2 plasterki pomidora",
          "1/4 awokado",
          "1 łyżeczka musztardy",
        ],
        instructions:
          "1. Posmaruj chleb musztardą. 2. Ułóż sałatę, indyka, pomidora i awokado. 3. Przykryj drugą kromką chleba.",
        difficulty: "Łatwy",
        prepTime: "5 minut",
      },
    },
    {
      name: "Obiad",
      time: "13:30 - 14:30",
      calories: 650,
      protein: 40,
      carbs: 65,
      fat: 20,
      recipe: {
        name: "Makaron pełnoziarnisty z kurczakiem i warzywami",
        ingredients: [
          "80g makaronu pełnoziarnistego (waga sucha)",
          "120g piersi z kurczaka",
          "1 łyżka oliwy z oliwek",
          "1/2 cukinii",
          "1/2 papryki czerwonej",
          "1 mały pomidor",
          "1 ząbek czosnku",
          "Przyprawy: sól, pieprz, bazylia",
        ],
        instructions:
          "1. Ugotuj makaron al dente. 2. Pokrój kurczaka w kostkę i usmaż na oliwie. 3. Dodaj pokrojone warzywa i czosnek. 4. Dopraw i duś 5-7 minut. 5. Połącz z makaronem.",
        difficulty: "Średni",
        prepTime: "20 minut",
      },
    },
    {
      name: "Podwieczorek",
      time: "16:30 - 17:00",
      calories: 250,
      protein: 15,
      carbs: 25,
      fat: 8,
      recipe: {
        name: "Koktajl proteinowy z owocami",
        ingredients: [
          "200ml mleka migdałowego",
          "1 miarka (30g) białka serwatkowego",
          "1/2 banana",
          "garść szpinaku",
          "50g mrożonych jagód",
        ],
        instructions:
          "1. Wszystkie składniki zmiksuj w blenderze do uzyskania gładkiej konsystencji.",
        difficulty: "Łatwy",
        prepTime: "5 minut",
      },
    },
    {
      name: "Kolacja",
      time: "19:30 - 20:30",
      calories: 550,
      protein: 35,
      carbs: 45,
      fat: 20,
      recipe: {
        name: "Sałatka z komosą ryżową i łososiem",
        ingredients: [
          "50g komosy ryżowej (waga sucha)",
          "100g łososia",
          "Mix sałat (rukola, szpinak)",
          "1/2 awokado",
          "1/2 ogórka",
          "5 pomidorków koktajlowych",
          "1 łyżka oliwy z oliwek",
          "Sok z 1/2 cytryny",
          "Przyprawy: sól, pieprz",
        ],
        instructions:
          "1. Ugotuj komosę ryżową. 2. Upiecz łososia w piekarniku (180°C, 15 minut). 3. Pokrój warzywa. 4. Wymieszaj wszystkie składniki. 5. Skrop oliwą i sokiem z cytryny, dopraw.",
        difficulty: "Średni",
        prepTime: "25 minut",
      },
    },
  ],
};

export default function DietResultPage() {
  const [diet] = useState(sampleDiet);

  // TODO integrate it with backend
  // useEffect(() => {
  //   const fetchDiet = async () => {
  //     // Pobieranie danych z API
  //     const response = await fetch('/api/diet');
  //     const data = await response.json();
  //     setDiet(data);
  //   };
  //   fetchDiet();
  // }, []);

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
            <h1 className="text-3xl font-bold tracking-tight">
              {sampleDiet.title}
            </h1>
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
