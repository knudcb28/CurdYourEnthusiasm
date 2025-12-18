import { Metadata } from "next";
import { notFound } from "next/navigation";
import CurdRating from "@/components/CurdRating";

// This will be dynamic based on your slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // TODO: Fetch restaurant from database based on slug
  const restaurantName = "Restaurant Name"; // Replace with DB fetch
  console.log("Restaurant slug:", slug); // For debugging

  return {
    title: `${restaurantName} Review - Madison, WI`,
    description: `Honest review of ${restaurantName} in Madison, WI. Food quality, atmosphere, service, and value ratings.`,
  };
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // TODO: Fetch restaurant data from MySQL using slug
  // const restaurant = await db.query('SELECT * FROM restaurants WHERE slug = ?', [slug]);
  console.log("Restaurant slug:", slug); // For debugging

  // Mock data for now
  const restaurant = {
    name: "Merchant",
    neighborhood: "Downtown Madison",
    cuisine: "American",
    address: "121 S Pinckney St, Madison, WI 53703",
    priceRange: "$$",
    overallRating: 4.5,
    foodQuality: 5,
    atmosphere: 4,
    service: 5,
    value: 4,
    creativity: 5,
    reviewBody: "Full review text goes here...",
    visitDate: "2024-12-01",
    dishesTried: ["Duck Hash", "Avocado Toast", "Old Fashioned"],
  };

  if (!restaurant) {
    notFound();
  }

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address,
      addressLocality: "Madison",
      addressRegion: "WI",
      addressCountry: "US",
    },
    servesCuisine: restaurant.cuisine,
    priceRange: restaurant.priceRange,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: restaurant.overallRating,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <article className="mx-auto max-w-4xl px-4 py-12">
          {/* Header */}
          <header className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
              {restaurant.name}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {restaurant.neighborhood} • {restaurant.cuisine} •{" "}
              {restaurant.priceRange}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Visited {new Date(restaurant.visitDate).toLocaleDateString()}
            </p>
          </header>

          {/* Overall Rating */}
          <div className="mb-8 rounded-lg bg-white p-6 dark:bg-zinc-900">
            <h2 className="mb-3 text-xl font-semibold">Overall Rating</h2>
            <CurdRating
              rating={restaurant.overallRating}
              size="lg"
              showNumber
            />
          </div>

          {/* Category Ratings */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <RatingRow label="Food Quality" rating={restaurant.foodQuality} />
            <RatingRow label="Atmosphere" rating={restaurant.atmosphere} />
            <RatingRow label="Service" rating={restaurant.service} />
            <RatingRow label="Value" rating={restaurant.value} />
            <RatingRow label="Creativity" rating={restaurant.creativity} />
          </div>

          {/* Review Body */}
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h2>The Experience</h2>
            <p>{restaurant.reviewBody}</p>

            <h3>What I Tried</h3>
            <ul>
              {restaurant.dishesTried.map((dish, i) => (
                <li key={i}>{dish}</li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}

function RatingRow({ label, rating }: { label: string; rating: number }) {
  return (
    <div className="rounded-lg bg-white p-4 dark:bg-zinc-900">
      <p className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </p>
      <CurdRating rating={rating} size="sm" showNumber />
    </div>
  );
}
