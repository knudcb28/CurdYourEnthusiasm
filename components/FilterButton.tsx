interface FilterButtonProps {
  href: string;
  icon?: string;
  children: React.ReactNode;
  featured?: boolean;
}

export default function FilterButton({
  href,
  icon,
  children,
  featured,
}: FilterButtonProps) {
  return (
    <a
      href={href}
      className={`
        group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-medium
        transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95
        ${
          featured
            ? "border-2 border-curd-400 bg-linear-to-r from-curd-400 to-amber-400 text-white shadow-md hover:shadow-curd-400/50 dark:from-curd-500 dark:to-amber-500"
            : "border border-zinc-300 bg-white text-zinc-700 hover:border-curd-300 hover:bg-curd-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-curd-700 dark:hover:bg-zinc-700"
        }
      `}
    >
      {icon && (
        <span className="text-base transition-transform group-hover:scale-110">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </a>
  );
}

