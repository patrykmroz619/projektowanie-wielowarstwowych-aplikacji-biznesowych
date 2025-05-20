import { getDietDetails } from "@/lib/diet/actions/getDietDetails";
import { DietDetails } from "@/lib/diet/components/DietDetails";

interface IDietResultPageProps {
  params: Promise<{ dietId: string }>;
}

export default async function DietResultPage(props: IDietResultPageProps) {
  const { params } = props;
  const { dietId } = await params;

  const diet = await getDietDetails(dietId);

  if (!diet) {
    return <div>Diet not found</div>;
  }

  return <DietDetails diet={diet} />;
}
