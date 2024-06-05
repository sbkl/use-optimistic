"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TRADING_SEASON_CODES = ["NEW", "CARRY FORWARD", "REPLENISHMENT"];

export function Playground(props: { tradingSeasonCode: string[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [optimisticCodes, setOptimisticCodes] = useOptimistic(
    props.tradingSeasonCode
  );
  return (
    <div className="space-y-6">
      <div className="flex space-x-8">
        <div className="w-64 shrink-0">
          <pre>url: {JSON.stringify(props.tradingSeasonCode, null, 2)}</pre>
          <pre>optimistic: {JSON.stringify(optimisticCodes, null, 2)}</pre>
        </div>
        <div>
          <label className="font-semibold">Trading Season codes</label>
          <ul className="flex flex-col space-y-2">
            {TRADING_SEASON_CODES.map((code) => {
              const newCodes = !optimisticCodes.includes(code)
                ? [...optimisticCodes, code]
                : optimisticCodes.filter((g) => g !== code);

              let newParams = new URLSearchParams(
                newCodes.sort().map((code) => ["tradingSeasonCode", code])
              );
              return (
                <li key={code}>
                  <Link
                    href={`?${newParams}`}
                    className={
                      optimisticCodes.includes(code)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }
                  >
                    {code}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white py-1 px-2 rounded-md"
        onClick={() => {
          startTransition(async () => {
            setOptimisticCodes([]);
            await sleep(1000);
            router.push("?");
          });
        }}
      >
        Clear
      </button>
    </div>
  );
}
