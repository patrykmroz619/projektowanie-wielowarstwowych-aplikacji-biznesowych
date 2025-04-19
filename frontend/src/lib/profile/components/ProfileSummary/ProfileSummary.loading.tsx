import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSummaryLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Twój profil</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Wiek</p>
            <Skeleton className="h-5 w-16 mt-1" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Płeć</p>
            <Skeleton className="h-5 w-24 mt-1" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Waga</p>
            <Skeleton className="h-5 w-16 mt-1" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Wzrost</p>
            <Skeleton className="h-5 w-16 mt-1" />
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium text-muted-foreground">Poziom aktywności</p>
            <Skeleton className="h-5 w-32 mt-1" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
