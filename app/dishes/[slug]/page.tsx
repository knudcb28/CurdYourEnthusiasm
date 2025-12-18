import { Metadata } from "next";
import { notFound } from "next/navigation";
import RestaurantCard from "@/components/RestaurantCard";
import { popularDishes, getDishBySlug } from "@/lib/dishes";

// Generate static params for all dishes
export async function generateStaticParams() {
  return popularDishes.map((dish) => ({
    slug: dish.slug,
  }));
}

// Generate metadata for each dish page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dish = getDishBySlug(slug);

  if (!dish) {
    return {
      title: "Dish Not Found",
    };
  }

  return {
    title: dish.metaTitle,
    description: dish.metaDescription,
    openGraph: {
      title: dish.metaTitle,
      description: dish.metaDescription,
      type: "website",
    },
  };
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = getDishBySlug(slug);

  if (!dish) {
    notFound();
  }

  // TODO: Fetch restaurants from MySQL that serve this dish
  // const restaurants = await db.query(
  //   'SELECT r.* FROM restaurants r JOIN review_dishes rd ON r.id = rd.restaurant_id WHERE rd.dish_slug = ?',
  //   [slug]
  // );

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

  const restaurants: Restaurant[] = []; // Replace with DB data

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-6xl">{dish.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                Best {dish.name} in Madison
              </h1>
              <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                {dish.description}
              </p>
            </div>
          </div>

          {/* Search Terms Context */}
          <div className="mt-6 flex flex-wrap gap-2">
            {dish.searchTerms.map((term) => (
              <span
                key={term}
                className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {restaurants.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Top Spots for {dish.name}
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {restaurants.length} restaurant{restaurants.length !== 1 ? "s" : ""}{" "}
                reviewed with amazing {dish.name.toLowerCase()}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.slug} {...restaurant} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <div className="mb-4 text-6xl opacity-20">{dish.icon}</div>
            <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              No {dish.name} Reviews Yet
            </h2>
            <p className="max-w-md text-zinc-600 dark:text-zinc-400">
              I haven&apos;t reviewed any restaurants featuring {dish.name.toLowerCase()}{" "}
              yet, but check back soon! New reviews drop every week.
            </p>
            <a
              href="/"
              className="mt-6 rounded-lg bg-amber-400 px-6 py-3 font-semibold text-zinc-900 transition-colors hover:bg-amber-500"
            >
              Browse All Reviews
            </a>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            About {dish.name} in Madison
          </h2>
          <div className="prose dark:prose-invert">
            <p className="text-zinc-600 dark:text-zinc-400">
              Looking for the best {dish.name.toLowerCase()} in Madison, WI? 
              You&apos;ve come to the right place. Every restaurant on this page has been 
              personally reviewed and rated on my cheese curd scale. I visit each spot, 
              try their {dish.name.toLowerCase()}, and give you an honest take on what 
              makes it special (or not).
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Madison has an incredible food scene, and {dish.name.toLowerCase()} is just 
              one part of it. Check back weekly for new reviews as I continue exploring 
              the best restaurants the city has to offer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

