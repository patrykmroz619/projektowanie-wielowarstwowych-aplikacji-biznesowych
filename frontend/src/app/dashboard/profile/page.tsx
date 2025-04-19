import { getLoggedUserProfileAction } from "@/lib/profile/actions/getLoggedUserProfileAction";
import { ProfileForm } from "@/lib/profile/components/ProfileForm/ProfileForm";

const ProfilePage = async () => {
  const userProfile = await getLoggedUserProfileAction();

  return (
    <main className="flex-1 container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <section>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Profil użytkownika</h1>
            <p className="text-muted-foreground">
              Wypełnij poniższy formularz, aby zaktualizować swoje dane.
            </p>
          </div>
        </section>

        <section>
          <ProfileForm userProfile={userProfile} />
        </section>

        <section>
          <div className="flex flex-col gap-2 items-start">
            <h2 className="text-2xl font-bold tracking-tight">Usuń konto</h2>
            <p className="text-muted-foreground">
              Jeśli chcesz usunąć swoje konto oraz wszystkie dane, kliknij poniższy przycisk.
              Pamiętaj, że tej operacji nie można cofnąć.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Usuń konto
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
