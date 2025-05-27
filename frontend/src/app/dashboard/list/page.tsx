import { getUserDiets } from "@/lib/diet/actions/getUserDiets";
import { DietsList } from "@/lib/diet/components/DietList";

export default async function DietsListPage() {
  const diets = await getUserDiets();

  if (!diets) {
    return <div>No diets found</div>;
  }

  console.log("DietsListPage", diets);

  return <DietsList diets={diets} />;
}
