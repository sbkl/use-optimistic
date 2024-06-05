import { Playground } from "@/components/playground";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tradingSeasonCode = !searchParams.tradingSeasonCode
    ? []
    : typeof searchParams.tradingSeasonCode === "string"
    ? [searchParams.tradingSeasonCode]
    : searchParams.tradingSeasonCode;

  return (
    <main className="h-full p-12">
      <Playground tradingSeasonCode={tradingSeasonCode} />
    </main>
  );
}
