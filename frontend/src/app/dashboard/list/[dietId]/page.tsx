import { getDietDetails } from "@/lib/diet/actions/getDietDetails";
import { DietDetails } from "@/lib/diet/components/DietDetails";

export default async function DietResultPage({ params }: { params: { dietId: string } }) {
  const { dietId } = params;
  const diet = await getDietDetails(dietId);

  if (!diet) {
    return <div>Diet not found</div>;
  }

  return <DietDetails diet={diet} />;
}
