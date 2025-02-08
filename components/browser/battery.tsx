import { BatteryFull } from "lucide-react";

import { MAX_LIMIT } from "@/lib/constants";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface BatteryProps {
  remaining: number;
  reset: number;
}

export default function Battery({ remaining, reset }: BatteryProps) {
  const resetRelative = new Intl.RelativeTimeFormat("en", {
    style: "long",
  }).format(Math.ceil((reset - Date.now()) / (1000 * 60 * 60)), "hour");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="flex flex-row gap-2 rounded p-1 px-1.5 hover:bg-gray-300"
            aria-label="Remaining requests"
          >
            <BatteryFull />
            <div className="font-semibold">{remaining}</div>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {remaining < MAX_LIMIT ? (
            <p>Request limit will reset {resetRelative}</p>
          ) : (
            <p>You can make {MAX_LIMIT} requests in 24 hours</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
