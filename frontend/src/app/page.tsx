"use client";

import FeatureCard from "@/components/homepage/featureCard";
import Footer from "@/components/homepage/footer";
import Header from "@/components/homepage/header";
import TestimonialCard from "@/components/homepage/testimonialCard";
import StepCard from "@/components/homepage/stepCard";
import { Button } from "@/components/ui/button";
import { Apple, Check, ChevronRight, Utensils, Weight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WelcomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="flex justify-center px-6 py-12 md:px-12 md:py-24 lg:px-16 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 max-w-[1500px]">
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
            <FeatureCard
              icon={Utensils}
              title="Spersonalizowane plany"
              description="Otrzymaj plan żywieniowy dopasowany do Twoich preferencji, alergii i celów zdrowotnych."
            />
            <FeatureCard
              icon={Apple}
              title="Różnorodne przepisy"
              description="Odkryj setki smacznych i zdrowych przepisów, które pomogą Ci osiągnąć Twoje cele."
            />
            <FeatureCard
              icon={Weight}
              title="Śledzenie postępów"
              description="Monitoruj swoje postępy i otrzymuj regularne aktualizacje planu w oparciu o Twoje wyniki."
            />
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
            <StepCard
              stepNumber="1"
              title="Uzupełnij profil"
              description="Podaj swoje dane, preferencje żywieniowe, alergie i cele zdrowotne."
            />
            <StepCard
              stepNumber="2"
              title="Otrzymaj plan"
              description="AI generuje spersonalizowany plan żywieniowy dostosowany do Twoich potrzeb."
            />
            <StepCard
              stepNumber="3"
              title="Śledź postępy"
              description="Monitoruj swoje postępy i otrzymuj wskazówki, jak poprawić wyniki."
            />
            <StepCard
              stepNumber="4"
              title="Osiągaj cele"
              description="Ciesz się rezultatami i kontynuuj swoją podróż ku zdrowszemu życiu."
            />
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
            <TestimonialCard
              initials="AK"
              name="Anna Kowalska"
              description="Schudła 10 kg w 3 miesiące"
              quote="Diety AI całkowicie zmieniło moje podejście do odżywiania. Plany są łatwe do przestrzegania, a przepisy pyszne. Polecam każdemu!"
            />
            <TestimonialCard
              initials="MN"
              name="Marek Nowak"
              description="Poprawił wyniki sportowe"
              quote="Jako sportowiec, potrzebowałem diety, która wspierałaby moje treningi. Diety AI idealnie dopasowało plan do moich potrzeb energetycznych."
            />
            <TestimonialCard
              initials="KW"
              name="Katarzyna Wiśniewska"
              description="Pokonała nietolerancje pokarmowe"
              quote="Mam wiele nietolerancji pokarmowych, co utrudniało mi zdrowe odżywianie. Diety AI stworzyło plan, który uwzględnia wszystkie moje ograniczenia."
            />
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[69rem] flex-col items-center justify-center gap-4 text-center">
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
      <Footer />
    </div>
  );
};

export default WelcomePage;
