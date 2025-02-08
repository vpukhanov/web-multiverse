import {
  BatteryFull,
  BatteryIcon,
  BatteryLowIcon,
  BatteryMediumIcon,
} from "lucide-react";

import { MAX_LIMIT } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
            className={cn(
              "flex flex-row gap-2 rounded p-1 px-1.5 hover:bg-gray-300",
              remaining === 0 && "bg-red-300 hover:bg-red-500",
            )}
            aria-label="Remaining requests"
          >
            {getIcon(remaining)}
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

function getIcon(remaining: number) {
  if (remaining > (MAX_LIMIT / 3) * 2) return <BatteryFull />;
  if (remaining > MAX_LIMIT / 3) return <BatteryMediumIcon />;
  if (remaining > 0) return <BatteryLowIcon />;
  return <BatteryIcon />;
}
