"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useClerk } from "@clerk/nextjs";
import { FileText, Library, Plus, Salad } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserDashboardPage = () => {
  const clerk = useClerk();
  const publicUserData = clerk.session?.publicUserData;

  return (
    <main className="flex-1 container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <section>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Witaj
              {publicUserData?.firstName && `, ${publicUserData.firstName}!`}
            </h1>
            <p className="text-muted-foreground">
              Twój osobisty asystent dietetyczny jest gotowy do pomocy. Co
              chcesz dzisiaj zrobić?
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Card className="flex flex-col h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">Wygeneruj nową dietę</CardTitle>
              <CardDescription>
                Stwórz spersonalizowany plan żywieniowy dopasowany do Twoich
                potrzeb i preferencji.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-primary/10">
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Personalizacja</h3>
                    <p className="text-sm text-muted-foreground">
                      Określ swoje cele, preferencje i ograniczenia żywieniowe.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-primary/10">
                    <Salad className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Różnorodne przepisy</h3>
                    <p className="text-sm text-muted-foreground">
                      Otrzymaj zróżnicowane i smaczne posiłki dopasowane do
                      Twoich potrzeb.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/dashboard/nowa-dieta">Wygeneruj nową dietę</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">Zobacz swoje diety</CardTitle>
              <CardDescription>
                Przeglądaj, edytuj i zarządzaj swoimi planami żywieniowymi.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Historia diet</h3>
                    <p className="text-sm text-muted-foreground">
                      Przeglądaj wszystkie swoje plany żywieniowe w jednym
                      miejscu.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-primary/10">
                    <Library />
                  </div>
                  <div>
                    <h3 className="font-medium">Analiza postępów</h3>
                    <p className="text-sm text-muted-foreground">
                      Śledź swoje postępy i zobacz, jak Twoje nawyki żywieniowe
                      się zmieniają.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/diety">Zobacz swoje diety</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold mb-4">Szybkie wskazówki</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Pij więcej wody</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pamiętaj o nawodnieniu - wypijaj minimum 2 litry wody
                  dziennie.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Jedz regularnie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Regularne posiłki pomagają utrzymać stabilny poziom cukru we
                  krwi.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Więcej warzyw</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Staraj się, aby warzywa stanowiły połowę każdego głównego
                  posiłku.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
};

export default UserDashboardPage;
