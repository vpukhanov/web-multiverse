import { BatteryFull } from "lucide-react";

interface BatteryProps {
  remaining: number;
}

export default function Battery({ remaining }: BatteryProps) {
  return (
    <button
      className="flex flex-row gap-2 rounded p-1 px-1.5 hover:bg-gray-300"
      aria-label="Remaining requests"
    >
      <BatteryFull />
      <div className="font-semibold">{remaining}</div>
    </button>
  );
}
