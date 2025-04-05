"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Utensils,
  Dumbbell,
} from "lucide-react";
import Link from "next/link";

// Przykładowe dane diet
const sampleDiets = [
  {
    id: "5",
    name: "Plan niskowęglowodanowy",
    createdAt: "2024-03-20",
    goal: "reduction",
    type: "lowCarb",
    calories: 1900,
    meals: 5,
  },
  {
    id: "4",
    name: "Dieta ketogeniczna",
    createdAt: "2024-02-05",
    goal: "maintenance",
    type: "ketogenic",
    calories: 2000,
    meals: 3,
  },
  {
    id: "3",
    name: "Dieta wegetariańska",
    createdAt: "2024-01-10",
    goal: "healthyEating",
    type: "vegetarian",
    calories: 2200,
    meals: 4,
  },
  {
    id: "2",
    name: "Plan budowy masy",
    createdAt: "2023-12-01",
    goal: "muscleGain",
    type: "standard",
    calories: 3200,
    meals: 6,
  },
  {
    id: "1",
    name: "Dieta redukcyjna",
    createdAt: "2023-11-15",
    goal: "reduction",
    type: "highProtein",
    calories: 1800,
    meals: 5,
  },
];

// Mapowanie celów diety na język polski
const goalLabels = {
  all: "Wszystkie cele",
  reduction: "Redukcja",
  maintenance: "Utrzymanie wagi",
  muscleGain: "Budowa masy",
  healthyEating: "Zdrowe odżywianie",
};

// Mapowanie typów diety na język polski
const dietTypeLabels = {
  all: "Wszystkie typy",
  standard: "Standardowa",
  vegetarian: "Wegetariańska",
  vegan: "Wegańska",
  ketogenic: "Ketogeniczna",
  lowCarb: "Niskowęglowodanowa",
  highProtein: "Wysokobiałkowa",
};

// Funkcja formatująca datę na format polski
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function DietsListPage() {
  const [diets, setDiets] = useState(sampleDiets);
  const [filterGoal, setFilterGoal] = useState<string | null>("all");
  const [filterType, setFilterType] = useState<string | null>("all");

  // TODO get data from API
  // useEffect(() => {
  //   const fetchDiets = async () => {
  //     const response = await fetch('/api/diets');
  //     const data = await response.json();
  //     setDiets(data);
  //   };
  //   fetchDiets();
  // }, []);

  // Filtrowanie diet na podstawie wyszukiwania i filtrów
  const filteredDiets = diets.filter((diet) => {
    const matchesGoal = !filterGoal || filterGoal === "all" || diet.goal === filterGoal;
    const matchesType = !filterType || filterType === "all" || diet.type === filterType;
    return matchesGoal && matchesType;
  });

  // Obsługa usuwania diety
  const handleDeleteDiet = (id: string) => {
    // W rzeczywistości wysłalibyśmy żądanie do API
    // await fetch(`/api/diets/${id}`, { method: 'DELETE' });
    setDiets(diets.filter((diet) => diet.id !== id));
  };

  return (
    <main className="flex-1 container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Moje diety</h1>
            <p className="text-muted-foreground">
              Przeglądaj i zarządzaj swoimi planami żywieniowymi
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/new">
              <Plus className="mr-2 h-4 w-4" />
              Stwórz nową dietę
            </Link>
          </Button>
        </section>

        <section className="flex flex-col md:flex-row md:justify-end gap-4">
          <Select onValueChange={(value) => setFilterGoal(value || null)}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>
                  {filterGoal ? goalLabels[filterGoal as keyof typeof goalLabels] : "Cel diety"}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie cele</SelectItem>
              <SelectItem value="reduction">Redukcja</SelectItem>
              <SelectItem value="maintenance">Utrzymanie wagi</SelectItem>
              <SelectItem value="muscleGain">Budowa masy</SelectItem>
              <SelectItem value="healthyEating">Zdrowe odżywianie</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setFilterType(value || null)}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Utensils className="mr-2 h-4 w-4" />
                <span>
                  {filterType
                    ? dietTypeLabels[filterType as keyof typeof dietTypeLabels]
                    : "Typ diety"}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie typy</SelectItem>
              <SelectItem value="standard">Standardowa</SelectItem>
              <SelectItem value="vegetarian">Wegetariańska</SelectItem>
              <SelectItem value="vegan">Wegańska</SelectItem>
              <SelectItem value="ketogenic">Ketogeniczna</SelectItem>
              <SelectItem value="lowCarb">Niskowęglowodanowa</SelectItem>
              <SelectItem value="highProtein">Wysokobiałkowa</SelectItem>
            </SelectContent>
          </Select>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiets.length > 0 ? (
            filteredDiets.map((diet) => (
              <Card key={diet.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{diet.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Opcje</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/list/${diet.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Wyświetl
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="#">
                            <Edit className="mr-2 h-4 w-4" />
                            Edytuj
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteDiet(diet.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Usuń
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Utworzono: {formatDate(diet.createdAt)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <span className="text-xs text-muted-foreground">Kalorie</span>
                      <span className="text-lg font-bold">
                        {diet.calories}
                        <span className="text-xs">kcal</span>
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <span className="text-xs text-muted-foreground">Posiłki</span>
                      <span className="text-lg font-bold">{diet.meals}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <Dumbbell className="mr-1 h-3 w-3" />
                      {goalLabels[diet.goal as keyof typeof goalLabels]}
                    </Badge>
                    <Badge variant="outline">
                      {dietTypeLabels[diet.type as keyof typeof dietTypeLabels]}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/dashboard/list/${diet.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Wyświetl dietę
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Utensils className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">Brak diet</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                {filterGoal || filterType
                  ? "Nie znaleziono diet spełniających kryteria wyszukiwania."
                  : "Nie masz jeszcze żadnych wygenerowanych diet."}
              </p>
              <Button asChild>
                <Link href="/dashboard/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Stwórz pierwszą dietę
                </Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
