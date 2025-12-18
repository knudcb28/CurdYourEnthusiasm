interface CurdRatingProps {
  rating: number; // 0-5
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

export default function CurdRating({
  rating,
  size = "md",
  showNumber = false,
}: CurdRatingProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const curds = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return "full";
    if (i < rating) return "half";
    return "empty";
  });

  return (
    <div className="flex items-center gap-1">
      <div className={`flex ${sizeClasses[size]}`}>
        {curds.map((curd, i) => (
          <span key={i} className={curd === "empty" ? "opacity-30" : ""}>
            🧀
          </span>
        ))}
      </div>
      {showNumber && (
        <span className="ml-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
