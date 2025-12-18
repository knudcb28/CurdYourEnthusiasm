import { Metadata } from "next";
import { notFound } from "next/navigation";
import RestaurantCard from "@/components/RestaurantCard";
import { allCategories } from "@/lib/categories";

// Get all possible category slugs for static generation
export async function generateStaticParams() {
  const allCats = Object.values(allCategories).flat();
  return allCats.map((cat) => ({
    slug: cat.slug,
  }));
}

// Generate metadata for each category page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const allCats = Object.values(allCategories).flat();
  const category = allCats.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const primarySearchTerm = category.searchTerms[0];

  return {
    title: `${category.name} - ${category.description}`,
    description: `${category.description}. Find the best ${primarySearchTerm} in Madison, WI with honest reviews and cheese curd ratings.`,
    openGraph: {
      title: `${category.name} in Madison, WI`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Find the category
  const allCats = Object.values(allCategories).flat();
  const category = allCats.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  // TODO: Fetch restaurants with this tag from MySQL
  // const restaurants = await db.query(
  //   'SELECT * FROM restaurants WHERE id IN (SELECT restaurant_id FROM restaurant_tags WHERE tag_slug = ?)',
  //   [params.slug]
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

  const restaurants: Restaurant[] = [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-curd-200 bg-white/80 px-4 py-2 text-sm font-medium text-curd-700 backdrop-blur-sm dark:border-curd-800 dark:bg-zinc-900/80 dark:text-curd-400">
            <span className="text-xl">{category.icon}</span>
            <span>Category</span>
          </div>

          <h1 className="mb-4 text-5xl font-bold text-zinc-900 dark:text-zinc-50">
            {category.name}
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            {category.description}
          </p>
        </div>

        {/* Restaurant Grid */}
        {restaurants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.slug} {...restaurant} />
            ))}
          </div>
        ) : (
          <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-16 text-center transition-all hover:border-curd-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-curd-700">
            <div className="absolute inset-0 bg-linear-to-br from-curd-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-curd-950/30"></div>
            <div className="relative">
              <div className="mb-4 text-6xl">{category.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                No Reviews Yet
              </h3>
              <p className="mx-auto max-w-md text-zinc-600 dark:text-zinc-400">
                I haven&apos;t reviewed any restaurants in this category yet.
                Check back soon as I explore Madison&apos;s food scene!
              </p>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 rounded-lg bg-white p-8 dark:bg-zinc-900">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            About {category.name} in Madison
          </h2>
          <div className="prose prose-zinc dark:prose-invert">
            <p className="text-zinc-700 dark:text-zinc-300">
              Looking for {category.searchTerms.join(", ")} in Madison, WI? This
              curated list features the best restaurants that fit this category,
              all rated on my signature cheese curd scale. Each review includes
              detailed ratings for food quality, atmosphere, service, value, and
              creativity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
