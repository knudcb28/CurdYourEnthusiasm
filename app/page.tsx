import FeaturedReviewCard from "@/components/FeaturedReviewCard";
import FilterButton from "@/components/FilterButton";
import { Metadata } from "next";
import { getAllRestaurants, getFeaturedReviews } from "@/lib/db";

export const metadata: Metadata = {
  title: "Curd Your Enthusiasm - Madison, WI Restaurant Reviews",
  description:
    "Honest, fun restaurant reviews from around Madison, WI. Rated on a cheese curd scale because Wisconsin deserves better than boring stars.",
  openGraph: {
    title: "Curd Your Enthusiasm - Madison Restaurant Reviews",
    description: "Honest, fun restaurant reviews from around Madison, WI.",
    url: "https://curdyourenthusiasm.com",
    siteName: "Curd Your Enthusiasm",
    locale: "en_US",
    type: "website",
  },
};

interface FeaturedReview {
  id: number;
  slug: string;
  name: string;
  neighborhood_name: string;
  cuisine_name: string;
  overall_rating: number;
  food_quality?: number;
  atmosphere?: number;
  service?: number;
  value?: number;
  review_body: string;
  visit_date: string;
  featured_image_url?: string;
  price_range: string;
  dishes_tried?: string;
}

export default async function Home() {
  // Fetch featured reviews with full data
  const reviewsData = await getFeaturedReviews(3);
  const featuredReviews = reviewsData as FeaturedReview[];

  // Also fetch total count for stats
  const restaurantsData = await getAllRestaurants();
  const totalRestaurants = Array.isArray(restaurantsData)
    ? restaurantsData.length
    : 0;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section with Gradient */}
      <header className="relative overflow-hidden border-b border-zinc-200 bg-linear-to-br from-curd-50 via-white to-curd-100/50 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-curd-200 bg-white/80 px-4 py-2 text-sm font-medium text-curd-700 backdrop-blur-sm dark:border-curd-800 dark:bg-zinc-900/80 dark:text-curd-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-curd-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-curd-500"></span>
              </span>
              New review every week
            </div>

            <h1 className="animate-fade-in-up text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-7xl">
              <span className="inline-block">🧀</span> Curd Your{" "}
              <span className="bg-linear-to-r from-curd-600 to-amber-600 bg-clip-text text-transparent dark:from-curd-400 dark:to-amber-400">
                Enthusiasm
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-xl text-zinc-600 dark:text-zinc-400">
              Madison&apos;s most honest restaurant reviews, rated on a cheese
              curd scale.
              <span className="block mt-2 text-base text-zinc-500">
                Because Wisconsin deserves better than boring star ratings.
              </span>
            </p>

            {/* Quick Stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-curd-600 dark:text-curd-400">
                  {totalRestaurants}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {totalRestaurants === 1 ? "Review" : "Reviews"}
                </div>
              </div>
              <div className="h-12 w-px bg-zinc-300 dark:bg-zinc-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-curd-600 dark:text-curd-400">
                  {totalRestaurants}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {totalRestaurants === 1 ? "Restaurant" : "Restaurants"}
                </div>
              </div>
              <div className="h-12 w-px bg-zinc-300 dark:bg-zinc-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-curd-600 dark:text-curd-400">
                  {totalRestaurants > 0
                    ? (totalRestaurants * 5).toLocaleString()
                    : "∞"}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Cheese Curds
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Popular Searches */}
        <div className="mb-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Popular Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            <FilterButton href="/categories/date-night" icon="💑">
              Date Night
            </FilterButton>
            <FilterButton href="/categories/brunch" icon="🥞">
              Best Brunch
            </FilterButton>
            <FilterButton href="/categories/outdoor-seating" icon="🌳">
              Outdoor Seating
            </FilterButton>
            <FilterButton href="/categories/cheap-eats" icon="💵">
              Cheap Eats
            </FilterButton>
            <FilterButton href="/categories/best-fish-fry" icon="🐟">
              Fish Fry
            </FilterButton>
            <FilterButton href="/dishes/cheese-curds" icon="🧀">
              Cheese Curds
            </FilterButton>
            <FilterButton href="/dishes/old-fashioned" icon="🥃">
              Old Fashioned
            </FilterButton>
            <FilterButton href="/dishes/pizza" icon="🍕">
              Pizza
            </FilterButton>
          </div>
        </div>

        {/* Featured Reviews */}
        <section className="animate-fade-in-up">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                Latest Reviews
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Fresh takes on Madison&apos;s food scene
              </p>
            </div>
          </div>

          {featuredReviews.length > 0 ? (
            <div className="space-y-8">
              {featuredReviews.map((review) => {
                // Parse dishes_tried JSON string if it exists
                let dishesArray: string[] = [];
                if (review.dishes_tried) {
                  try {
                    dishesArray = JSON.parse(review.dishes_tried);
                  } catch {
                    dishesArray = [];
                  }
                }

                return (
                  <FeaturedReviewCard
                    key={review.slug}
                    slug={review.slug}
                    name={review.name}
                    neighborhood={review.neighborhood_name}
                    cuisine={review.cuisine_name}
                    rating={review.overall_rating}
                    reviewBody={review.review_body}
                    visitDate={review.visit_date}
                    priceRange={review.price_range}
                    featuredImageUrl={review.featured_image_url}
                    foodQuality={review.food_quality}
                    atmosphere={review.atmosphere}
                    service={review.service}
                    value={review.value}
                    dishiesTried={dishesArray}
                  />
                );
              })}
            </div>
          ) : (
            <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-16 text-center transition-all hover:border-curd-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-curd-700">
              <div className="absolute inset-0 bg-linear-to-br from-curd-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-curd-950/30"></div>
              <div className="relative">
                <div className="mb-4 text-6xl">🧀</div>
                <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  First Review Coming Soon!
                </h3>
                <p className="mx-auto max-w-md text-zinc-600 dark:text-zinc-400">
                  I&apos;m gearing up to explore Madison&apos;s incredible food
                  scene. Check back soon for the first cheese curd review!
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-curd-100 px-4 py-2 text-sm font-medium text-curd-700 dark:bg-curd-900/30 dark:text-curd-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-curd-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-curd-500"></span>
                  </span>
                  New reviews every week
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
