"use client";

import { SettingsIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SettingsProps {
  universe: string;
  onUniverseChange: (universe: string) => void;
  disabled?: boolean;
}

export default function Settings({
  universe,
  onUniverseChange,
  disabled,
}: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded p-1 hover:bg-gray-300 disabled:opacity-50"
        aria-label="Toggle settings"
        disabled={disabled}
      >
        <SettingsIcon size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-80 rounded-lg bg-white p-4 shadow-xl">
          <h3 className="mb-2 font-semibold">Universe Description</h3>
          <textarea
            value={universe}
            onChange={(e) => onUniverseChange(e.target.value)}
            placeholder="Describe the universe context for the LLM..."
            className="h-32 w-full rounded-md border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
}
