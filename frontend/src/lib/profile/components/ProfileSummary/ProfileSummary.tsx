import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getLoggedUserProfileAction } from "../../actions/getLoggedUserProfileAction";
import { getAge } from "@/lib/utils";

const activityLevelLabels: Record<string, string> = {
  sedentary: "Siedzący",
  light: "Lekko aktywny",
  moderate: "Umiarkowany",
  active: "Aktywny",
  veryActive: "Bardzo aktywny",
};

const genderLabels: Record<string, string> = {
  male: "Mężczyzna",
  female: "Kobieta",
};

export async function ProfileSummary() {
  const profile = await getLoggedUserProfileAction();

  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Twój profil</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Nie znaleziono profilu. Utwórz swój profil, aby móc korzystać z
            pełni możliwości aplikacji.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/dashboard/profile">Utwórz profil</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Twój profil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Wiek</p>
            <p>{getAge(profile.dob)} lat</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Płeć</p>
            <p>{genderLabels[profile.gender] || profile.gender}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Waga</p>
            <p>{profile.weight} kg</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Wzrost</p>
            <p>{profile.height} cm</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium text-muted-foreground">
              Poziom aktywności
            </p>
            <p>
              {activityLevelLabels[profile.activityLevel] ||
                profile.activityLevel}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/dashboard/profile">Edytuj profil</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
