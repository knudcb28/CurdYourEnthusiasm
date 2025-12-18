import Link from "next/link";
import CurdRating from "./CurdRating";
import Image from "next/image";

interface FeaturedReviewCardProps {
  slug: string;
  name: string;
  neighborhood: string;
  cuisine: string;
  rating: number;
  reviewBody: string;
  visitDate: string;
  priceRange: string;
  featuredImageUrl?: string;
  foodPhotos?: string[];
  dishiesTried?: string[];
  foodQuality?: number;
  atmosphere?: number;
  service?: number;
  value?: number;
}

export default function FeaturedReviewCard({
  slug,
  name,
  neighborhood,
  cuisine,
  rating,
  reviewBody,
  visitDate,
  priceRange,
  featuredImageUrl,
  foodPhotos = [],
  dishiesTried = [],
  foodQuality,
  atmosphere,
  service,
  value,
}: FeaturedReviewCardProps) {
  const formattedDate = new Date(visitDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid gap-0 lg:grid-cols-5">
        {/* Image Section - Takes up 2 columns on large screens */}
        <div className="relative lg:col-span-2">
          {/* Main Restaurant Image */}
          <div className="relative h-64 overflow-hidden bg-zinc-100 dark:bg-zinc-800 lg:h-full lg:min-h-[500px]">
            {featuredImageUrl ? (
              <Image
                src={featuredImageUrl}
                alt={`${name} restaurant`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl">
                🧀
              </div>
            )}

            {/* Rating Badge Overlay */}
            <div className="absolute left-4 top-4 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm dark:bg-zinc-900/95">
              <CurdRating rating={rating} size="sm" showNumber />
            </div>
          </div>

          {/* Food Photos Grid - Show if we have them */}
          {foodPhotos.length > 0 && (
            <div className="grid grid-cols-3 gap-1 p-1 lg:absolute lg:bottom-0 lg:left-0 lg:right-0">
              {foodPhotos.slice(0, 3).map((photo, idx) => (
                <div
                  key={idx}
                  className="relative h-20 overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800"
                >
                  <Image
                    src={photo}
                    alt={`Food photo ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Section - Takes up 3 columns on large screens */}
        <div className="flex flex-col p-6 lg:col-span-3 lg:p-8">
          {/* Header */}
          <div className="mb-4">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-medium text-curd-600 dark:text-curd-400">
                {cuisine}
              </span>
              <span>•</span>
              <span>{neighborhood}</span>
              <span>•</span>
              <span>{priceRange}</span>
              <span>•</span>
              <time dateTime={visitDate} className="text-xs">
                {formattedDate}
              </time>
            </div>

            <Link
              href={`/restaurants/${slug}`}
              className="group/title inline-block"
            >
              <h2 className="text-3xl font-bold text-zinc-900 transition-colors group-hover/title:text-curd-600 dark:text-zinc-50 dark:group-hover/title:text-curd-400 lg:text-4xl">
                {name}
              </h2>
            </Link>
          </div>

          {/* Quick Ratings Grid */}
          {(foodQuality || atmosphere || service || value) && (
            <div className="mb-6 grid grid-cols-2 gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50 sm:grid-cols-4">
              {foodQuality && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-curd-600 dark:text-curd-400">
                    {foodQuality}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Food
                  </div>
                </div>
              )}
              {atmosphere && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-curd-600 dark:text-curd-400">
                    {atmosphere}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Vibes
                  </div>
                </div>
              )}
              {service && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-curd-600 dark:text-curd-400">
                    {service}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Service
                  </div>
                </div>
              )}
              {value && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-curd-600 dark:text-curd-400">
                    {value}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Value
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Review Body */}
          <div className="mb-6 flex-1">
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 lg:text-lg">
              {reviewBody}
            </p>
          </div>

          {/* Dishes Tried */}
          {dishiesTried.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                What I Tried
              </h3>
              <div className="flex flex-wrap gap-2">
                {dishiesTried.map((dish, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-curd-100 px-3 py-1 text-sm font-medium text-curd-800 dark:bg-curd-900/30 dark:text-curd-300"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Read More Link */}
          <div>
            <Link
              href={`/restaurants/${slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-curd-600 px-6 py-3 font-semibold text-white transition-all hover:bg-curd-700 hover:gap-3 dark:bg-curd-500 dark:hover:bg-curd-600"
            >
              Read Full Review
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
