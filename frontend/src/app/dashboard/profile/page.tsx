import { getLoggedUserProfileAction } from "@/lib/profile/actions/getLoggedUserProfileAction";

import ProfileForm from "./ProfileForm";

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
      </div>
    </main>
  );
};

export default ProfilePage;
