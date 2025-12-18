"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RestaurantSelector from "@/components/RestaurantSelector";
import CurdRating from "@/components/CurdRating";
import Link from "next/link";

interface RestaurantData {
  slug: string;
  name: string;
  neighborhood: string;
  cuisine: string;
  priceRange: string;
  overallRating: number;
  imageUrl?: string;
  ratings: {
    foodQuality: number;
    atmosphere: number;
    service: number;
    value: number;
    creativity: number;
    returnFactor: number;
  };
  features: string[];
  dietary: string[];
  visitDate: string;
  reviewSnippet: string;
}

export default function ComparePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derive slugs directly from URL params (no local state needed for this)
  const slugsParam = searchParams.get("restaurants");
  const slugsFromUrl = slugsParam ? slugsParam.split(",").slice(0, 3) : [];
  const slugsKey = slugsFromUrl.join(","); // For useEffect dependency

  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);

  // Fetch restaurant data when URL params change
  useEffect(() => {
    if (slugsFromUrl.length > 0) {
      // TODO: Fetch restaurant data from MySQL
      // const data = await fetchRestaurants(slugsFromUrl);
      // setRestaurants(data);
    } else {
      setRestaurants([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugsKey]);

  // Update URL when selection changes (state will update via searchParams)
  const handleSelectionChange = (slugs: string[]) => {
    if (slugs.length > 0) {
      router.push(`/compare?restaurants=${slugs.join(",")}`);
    } else {
      router.push("/compare");
    }
  };

  const categories = [
    { key: "foodQuality", label: "Food Quality", icon: "🍽️" },
    { key: "atmosphere", label: "Atmosphere", icon: "✨" },
    { key: "service", label: "Service", icon: "🙋" },
    { key: "value", label: "Value", icon: "💰" },
    { key: "creativity", label: "Creativity", icon: "🎨" },
    { key: "returnFactor", label: "Return Factor", icon: "🔄" },
  ];

  const featureLabels: Record<string, string> = {
    "outdoor-seating": "Outdoor Seating",
    "date-night": "Date Night",
    "family-friendly": "Family Friendly",
    "good-for-groups": "Good for Groups",
    "late-night": "Late Night",
    "takes-reservations": "Takes Reservations",
    "full-bar": "Full Bar",
    "craft-cocktails": "Craft Cocktails",
  };

  const dietaryLabels: Record<string, string> = {
    vegetarian: "Vegetarian Options",
    vegan: "Vegan Options",
    "gluten-free": "Gluten-Free Options",
    "dairy-free": "Dairy-Free Options",
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            Compare Restaurants
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Select 2-3 restaurants to compare side-by-side
          </p>
        </div>

        {/* Restaurant Selector */}
        <div className="mb-8">
          <RestaurantSelector
            selectedSlugs={slugsFromUrl}
            onSelect={handleSelectionChange}
            maxSelections={3}
          />
        </div>

        {/* Comparison Table */}
        {restaurants.length >= 2 ? (
          <div className="space-y-6">
            {/* Overall Ratings Card */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  Overall Rating
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.slug}
                    className="border-r border-zinc-200 p-6 last:border-r-0 dark:border-zinc-800"
                  >
                    <Link
                      href={`/restaurants/${restaurant.slug}`}
                      className="group mb-2 block text-xl font-bold text-zinc-900 hover:text-curd-600 dark:text-zinc-50 dark:hover:text-curd-400"
                    >
                      {restaurant.name}
                    </Link>
                    <div className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {restaurant.neighborhood} • {restaurant.cuisine} •{" "}
                      {restaurant.priceRange}
                    </div>
                    <div className="flex items-center gap-2">
                      <CurdRating rating={restaurant.overallRating} size="lg" />
                      <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {restaurant.overallRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Ratings */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  Category Ratings
                </h2>
              </div>
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {categories.map((category) => (
                  <div
                    key={category.key}
                    className="grid grid-cols-2 lg:grid-cols-3"
                  >
                    {restaurants.map((restaurant, idx) => (
                      <div
                        key={restaurant.slug}
                        className={`p-6 ${
                          idx === 0
                            ? "border-r border-zinc-200 dark:border-zinc-800"
                            : idx === 1 && restaurants.length === 3
                            ? "border-r border-zinc-200 dark:border-zinc-800"
                            : ""
                        }`}
                      >
                        {idx === 0 && (
                          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                            <span>{category.icon}</span>
                            <span>{category.label}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <CurdRating
                            rating={
                              restaurant.ratings[
                                category.key as keyof typeof restaurant.ratings
                              ]
                            }
                          />
                          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                            {restaurant.ratings[
                              category.key as keyof typeof restaurant.ratings
                            ].toFixed(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  Features & Amenities
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurants.map((restaurant) => (
                    <div key={restaurant.slug}>
                      <h3 className="mb-3 font-semibold text-zinc-900 dark:text-zinc-50">
                        {restaurant.name}
                      </h3>
                      <div className="space-y-2">
                        {restaurant.features.length > 0 ? (
                          restaurant.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 text-sm"
                            >
                              <span className="text-green-600 dark:text-green-400">
                                ✓
                              </span>
                              <span className="text-zinc-700 dark:text-zinc-300">
                                {featureLabels[feature] || feature}
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-zinc-500 dark:text-zinc-500">
                            No features listed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dietary Options */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  Dietary Options
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurants.map((restaurant) => (
                    <div key={restaurant.slug}>
                      <h3 className="mb-3 font-semibold text-zinc-900 dark:text-zinc-50">
                        {restaurant.name}
                      </h3>
                      <div className="space-y-2">
                        {restaurant.dietary.length > 0 ? (
                          restaurant.dietary.map((diet) => (
                            <div
                              key={diet}
                              className="flex items-center gap-2 text-sm"
                            >
                              <span className="text-green-600 dark:text-green-400">
                                ✓
                              </span>
                              <span className="text-zinc-700 dark:text-zinc-300">
                                {dietaryLabels[diet] || diet}
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-zinc-500 dark:text-zinc-500">
                            No dietary options listed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Share Comparison */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 font-semibold text-zinc-900 dark:text-zinc-50">
                Share This Comparison
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${
                    window.location.origin
                  }/compare?restaurants=${slugsFromUrl.join(",")}`}
                  className="flex-1 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${
                        window.location.origin
                      }/compare?restaurants=${slugsFromUrl.join(",")}`
                    );
                  }}
                  className="rounded-lg bg-curd-400 px-6 py-2 font-semibold text-zinc-900 transition-colors hover:bg-curd-500"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        ) : slugsFromUrl.length === 1 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-center">
              <div className="mb-4 text-6xl">🧀</div>
              <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Select One More Restaurant
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Choose at least 2 restaurants to start comparing
              </p>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-center">
              <div className="mb-4 text-6xl">⚖️</div>
              <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Select Restaurants to Compare
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Choose 2-3 restaurants from the search above
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
