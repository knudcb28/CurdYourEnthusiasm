import { Metadata } from "next";
import RestaurantCard from "@/components/RestaurantCard";

export const metadata: Metadata = {
  title: "Top 100 Restaurants in Madison, WI - Curd Your Enthusiasm",
  description:
    "The definitive ranking of the best restaurants in Madison, Wisconsin. Honest reviews and cheese curd ratings.",
};

interface Restaurant {
  slug: string;
  name: string;
  neighborhood: string;
  cuisine: string;
  rating: number;
  imageUrl?: string;
  reviewSnippet?: string;
  visitDate?: string;
}

export default function Top100Page() {
  // TODO: Fetch top 100 restaurants from database
  // const restaurants = await db.query('SELECT * FROM restaurants ORDER BY overall_rating DESC LIMIT 100');

  const restaurants: Restaurant[] = [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-zinc-900 dark:text-zinc-50">
            Top 100 Restaurants in Madison
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            The definitive ranking based on food quality, atmosphere, service,
            and value
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-500">
            <span>Updated weekly</span>
            <span>•</span>
            <span>
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
            All Cuisines
          </button>
          <button className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
            All Neighborhoods
          </button>
          <button className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
            All Price Ranges
          </button>
        </div>

        {/* Restaurant List */}
        {restaurants.length > 0 ? (
          <div className="space-y-4">
            {restaurants.map((restaurant, index) => (
              <div
                key={restaurant.slug}
                className="flex items-start gap-6 rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* Ranking Number */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-curd-100 dark:bg-curd-900">
                  <span className="text-2xl font-bold text-curd-700 dark:text-curd-300">
                    {index + 1}
                  </span>
                </div>

                {/* Restaurant Info */}
                <div className="flex-1">
                  <RestaurantCard {...restaurant} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
            <div className="mx-auto max-w-md">
              <p className="mb-2 text-2xl">🧀</p>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Top 100 Coming Soon!
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                I&apos;m working my way through Madison&apos;s incredible
                restaurant scene. Check back soon as I add new reviews every
                week!
              </p>
              <p className="mt-4 text-sm text-zinc-500">
                Want to suggest a restaurant? Email me at{" "}
                <a
                  href="mailto:hello@curdyourenthusiasm.com"
                  className="text-curd-600 hover:underline dark:text-curd-400"
                >
                  hello@curdyourenthusiasm.com
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Methodology */}
        <div className="mt-16 rounded-lg bg-white p-8 dark:bg-zinc-900">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Ranking Methodology
          </h2>
          <div className="prose prose-zinc dark:prose-invert">
            <p className="text-zinc-700 dark:text-zinc-300">
              Rankings are based on the overall rating, which is calculated from
              five equally-weighted categories:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="text-zinc-700 dark:text-zinc-300">
                <strong>Food Quality</strong> - Taste, freshness, and execution
              </li>
              <li className="text-zinc-700 dark:text-zinc-300">
                <strong>Atmosphere</strong> - Ambiance, décor, and overall vibe
              </li>
              <li className="text-zinc-700 dark:text-zinc-300">
                <strong>Service</strong> - Attentiveness and friendliness
              </li>
              <li className="text-zinc-700 dark:text-zinc-300">
                <strong>Value</strong> - Quality relative to price
              </li>
              <li className="text-zinc-700 dark:text-zinc-300">
                <strong>Creativity</strong> - Unique offerings and innovation
              </li>
            </ul>
            <p className="mt-4 text-zinc-700 dark:text-zinc-300">
              All reviews are based on anonymous visits and paid meals. No
              sponsored content, no free meals—just honest opinions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
