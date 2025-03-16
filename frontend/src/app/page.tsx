"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Apple,
  Check,
  ChevronRight,
  Salad,
  Utensils,
  Weight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky px-4 top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold">
            <Image
              src="/logo.png"
              width={300}
              height={100}
              alt="diety ai"
              className="w-40 saturate-0"
            />
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#funkcje"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Funkcje
            </Link>
            <Link
              href="#jak-to-dziala"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Jak to działa
            </Link>
            <Link
              href="#opinie"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Opinie
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Logowanie</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="px-6 py-12 md:px-12 md:py-24 lg:px-16 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Spersonalizowane diety dopasowane do Twoich potrzeb
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Diety AI tworzy plany żywieniowe idealnie dopasowane do
                  Twojego stylu życia, celów i preferencji. Osiągnij swoje cele
                  zdrowotne z pomocą sztucznej inteligencji.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Rozpocznij za darmo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#jak-to-dziala">Dowiedz się więcej</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check />
                  <span>Bez zobowiązań</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check />
                  <span>Dieta już w kilka sekund</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[450px] w-[350px] overflow-hidden rounded-xl border bg-background p-4 shadow-xl">
                <Image
                  src="/gigachad.png"
                  width={350}
                  height={450}
                  alt="Aplikacja Diety AI"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="funkcje"
          className="px-6 py-12 md:px-12 md:py-24 lg:px-16 lg:py-32 bg-muted/50"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Dlaczego warto wybrać Diety AI?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Nasza aplikacja wykorzystuje zaawansowane algorytmy sztucznej
              inteligencji, aby tworzyć spersonalizowane plany żywieniowe
              dostosowane do Twoich indywidualnych potrzeb.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:max-w-5xl lg:gap-8 mt-12">
            <Card>
              <CardHeader>
                <Utensils className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Spersonalizowane plany</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Otrzymaj plan żywieniowy dopasowany do Twoich preferencji,
                  alergii i celów zdrowotnych.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Apple className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Różnorodne przepisy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Odkryj setki smacznych i zdrowych przepisów, które pomogą Ci
                  osiągnąć Twoje cele.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Weight className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Śledzenie postępów</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitoruj swoje postępy i otrzymuj regularne aktualizacje
                  planu w oparciu o Twoje wyniki.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section
          id="jak-to-dziala"
          className="px-6 py-12 md:px-12 md:py-24 lg:px-16 lg:py-32"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Jak działa Diety AI?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Prosty proces w 4 krokach, który pomoże Ci rozpocząć zdrowszą
              dietę już dziś.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-4 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold">Uzupełnij profil</h3>
              <p className="text-muted-foreground">
                Podaj swoje dane, preferencje żywieniowe, alergie i cele
                zdrowotne.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold">Otrzymaj plan</h3>
              <p className="text-muted-foreground">
                AI generuje spersonalizowany plan żywieniowy dostosowany do
                Twoich potrzeb.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Śledź postępy</h3>
              <p className="text-muted-foreground">
                Monitoruj swoje postępy i otrzymuj wskazówki, jak poprawić
                wyniki.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                4
              </div>
              <h3 className="text-xl font-bold">Osiągaj cele</h3>
              <p className="text-muted-foreground">
                Ciesz się rezultatami i kontynuuj swoją podróż ku zdrowszemu
                życiu.
              </p>
            </div>
          </div>
        </section>

        <section
          id="opinie"
          className="px-6 py-12 md:px-12 md:py-24 lg:px-16 lg:py-32 bg-muted/50"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Co mówią nasi użytkownicy
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Dołącz do tysięcy zadowolonych użytkowników, którzy zmienili swoje
              nawyki żywieniowe dzięki Diety AI.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">AK</span>
                  </div>
                  <div>
                    <CardTitle>Anna Kowalska</CardTitle>
                    <CardDescription>
                      Schudła 10 kg w 3 miesiące
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  &quot;Diety AI całkowicie zmieniło moje podejście do
                  odżywiania. Plany są łatwe do przestrzegania, a przepisy
                  pyszne. Polecam każdemu!&quot;
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">MN</span>
                  </div>
                  <div>
                    <CardTitle>Marek Nowak</CardTitle>
                    <CardDescription>Poprawił wyniki sportowe</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  &quot;Jako sportowiec, potrzebowałem diety, która wspierałaby
                  moje treningi. Diety AI idealnie dopasowało plan do moich
                  potrzeb energetycznych.&quot;
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">KW</span>
                  </div>
                  <div>
                    <CardTitle>Katarzyna Wiśniewska</CardTitle>
                    <CardDescription>
                      Pokonała nietolerancje pokarmowe
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  &quot;Mam wiele nietolerancji pokarmowych, co utrudniało mi
                  zdrowe odżywianie. Diety AI stworzyło plan, który uwzględnia
                  wszystkie moje ograniczenia.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Rozpocznij swoją podróż już dziś
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Dołącz do tysięcy osób, które zmieniły swoje życie dzięki
              spersonalizowanym planom żywieniowym Diety AI.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link href="/login">
                Zacznij już teraz
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Bez zobowiązań. Usługa jest całkowicie darmowa.
            </p>
          </div>
        </section>
      </main>
      <footer className="px-4 border-t bg-muted/50">
        <div className="flex flex-col gap-8 py-12 md:py-16 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-4 lg:w-1/3">
            <div className="flex items-center gap-2 font-bold">
              <Salad className="h-6 w-6 text-primary" />
              <span>Diety AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Diety AI to innowacyjna aplikacja wykorzystująca sztuczną
              inteligencję do tworzenia spersonalizowanych planów żywieniowych
              dostosowanych do indywidualnych potrzeb użytkowników.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Produkt</h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Funkcje
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Firma</h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  O nas
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Kariera
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Pomoc</h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Kontakt
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Wsparcie
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Polityka prywatności
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Diety AI. Wszelkie prawa
            zastrzeżone.
          </p>
          <div className="flex gap-4 sm:ml-auto">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Polityka prywatności
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Warunki korzystania
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Polityka cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
