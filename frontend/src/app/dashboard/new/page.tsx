import { Suspense } from "react";
import { DietForm } from "@/lib/diet/components/DietForm";
import { ProfileSummary, ProfileSummaryLoading } from "@/lib/profile/components/ProfileSummary";

export default function NewDietPage() {
  return (
    <main className="flex-1 container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <section>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Stwórz nową dietę</h1>
            <p className="text-muted-foreground">
              Wypełnij poniższy formularz, aby stworzyć spersonalizowany plan żywieniowy.
            </p>
          </div>
        </section>

        <section>
          <Suspense fallback={<ProfileSummaryLoading />}>
            <ProfileSummary />
          </Suspense>
        </section>

        <section>
          <DietForm />
        </section>
      </div>
    </main>
  );
}
