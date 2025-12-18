"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  ariaLabel?: string;
  icons?: {
    checked: React.ReactNode;
    unchecked: React.ReactNode;
  };
}

export default function Switch({
  checked,
  onChange,
  label,
  ariaLabel,
  icons,
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onChange}
      aria-label={ariaLabel || label}
      className={`
        relative inline-flex h-7 w-12 items-center rounded-full transition-colors
        ${
          checked
            ? "bg-curd-500 dark:bg-curd-400"
            : "bg-zinc-300 dark:bg-zinc-700"
        }
        hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-curd-500 focus-visible:ring-offset-2
        data-[state=checked]:bg-curd-500 data-[state=unchecked]:bg-zinc-300
        dark:data-[state=checked]:bg-curd-400 dark:data-[state=unchecked]:bg-zinc-700
      `}
    >
      <SwitchPrimitive.Thumb
        className={`
          pointer-events-none flex h-5 w-5 items-center justify-center
          transform rounded-full bg-white shadow-lg transition-transform
          ${checked ? "translate-x-6" : "translate-x-1"}
          data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1
        `}
      >
        {icons && (
          <span className="text-xs">
            {checked ? icons.checked : icons.unchecked}
          </span>
        )}
      </SwitchPrimitive.Thumb>
      {label && <span className="sr-only">{label}</span>}
    </SwitchPrimitive.Root>
  );
}
