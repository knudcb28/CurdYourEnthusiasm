"use client";

import { useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import RestaurantCard from "@/components/RestaurantCard";
import FilterPanel, { FilterState } from "@/components/FilterPanel";

// Dynamically import the map to avoid SSR issues
const RestaurantMap = dynamic(() => import("@/components/RestaurantMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[600px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-center">
        <div className="mb-2 text-4xl">🗺️</div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Loading map...
        </p>
      </div>
    </div>
  ),
});

// Mock data - will be replaced with MySQL queries
interface Restaurant {
  slug: string;
  name: string;
  neighborhood: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  reviewSnippet?: string;
  visitDate?: string;
  features?: string[];
  dietary?: string[];
}

const mockRestaurants: Restaurant[] = [
  // Add mock data here for testing - will be replaced with DB
  // Example with coordinates:
  // {
  //   slug: "merchant-madison",
  //   name: "Merchant",
  //   neighborhood: "Downtown",
  //   cuisine: "American",
  //   rating: 4.5,
  //   priceRange: "$$$",
  //   latitude: 43.0735,
  //   longitude: -89.3850,
  //   reviewSnippet: "Incredible brunch spot with a rotating menu.",
  //   features: ["outdoor-seating", "takes-reservations"],
  //   dietary: ["vegetarian", "gluten-free"],
  // },
];

export default function ReviewsPageClient() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [],
    cuisines: [],
    neighborhoods: [],
    features: [],
    dietary: [],
    minRating: 0,
    sortBy: "rating-desc",
  });

  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    let filtered = [...mockRestaurants];

    // Apply filters
    if (filters.priceRange.length > 0) {
      filtered = filtered.filter((r) =>
        filters.priceRange.includes(r.priceRange)
      );
    }

    if (filters.cuisines.length > 0) {
      filtered = filtered.filter((r) =>
        filters.cuisines.includes(r.cuisine.toLowerCase())
      );
    }

    if (filters.neighborhoods.length > 0) {
      filtered = filtered.filter((r) =>
        filters.neighborhoods.includes(
          r.neighborhood.toLowerCase().replace(" ", "-")
        )
      );
    }

    if (filters.features.length > 0) {
      filtered = filtered.filter((r) =>
        filters.features.some((f) => r.features?.includes(f))
      );
    }

    if (filters.dietary.length > 0) {
      filtered = filtered.filter((r) =>
        filters.dietary.some((d) => r.dietary?.includes(d))
      );
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter((r) => r.rating >= filters.minRating);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "rating-desc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-asc":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case "date-desc":
        filtered.sort((a, b) =>
          (b.visitDate || "").localeCompare(a.visitDate || "")
        );
        break;
      case "date-asc":
        filtered.sort((a, b) =>
          (a.visitDate || "").localeCompare(b.visitDate || "")
        );
        break;
      case "price-asc":
        filtered.sort((a, b) => a.priceRange.localeCompare(b.priceRange));
        break;
      case "price-desc":
        filtered.sort((a, b) => b.priceRange.localeCompare(a.priceRange));
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [filters]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="grid lg:grid-cols-[280px_1fr]">
        {/* Filter Sidebar */}
        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          resultCount={filteredRestaurants.length}
        />

        {/* Main Content */}
        <main className="min-h-screen bg-zinc-50 p-6 dark:bg-zinc-950">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                Reviews
              </h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Browse {mockRestaurants.length} restaurant reviews from around
                Madison
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 rounded-lg border border-zinc-200 p-1 dark:border-zinc-800">
              <button
                onClick={() => setViewMode("list")}
                className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-curd-400 text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                }`}
              >
                📋 List
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "map"
                    ? "bg-curd-400 text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                }`}
              >
                🗺️ Map
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.priceRange.length > 0 ||
            filters.cuisines.length > 0 ||
            filters.neighborhoods.length > 0 ||
            filters.features.length > 0 ||
            filters.dietary.length > 0 ||
            filters.minRating > 0) && (
            <div className="mb-6 flex flex-wrap gap-2">
              {filters.priceRange.map((price) => (
                <span
                  key={price}
                  className="inline-flex items-center gap-1 rounded-full bg-curd-100 px-3 py-1 text-sm font-medium text-curd-700 dark:bg-curd-900/30 dark:text-curd-400"
                >
                  {price}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        priceRange: filters.priceRange.filter(
                          (p) => p !== price
                        ),
                      })
                    }
                    className="ml-1 hover:text-curd-900 dark:hover:text-curd-200"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.cuisines.map((cuisine) => (
                <span
                  key={cuisine}
                  className="inline-flex items-center gap-1 rounded-full bg-curd-100 px-3 py-1 text-sm font-medium text-curd-700 dark:bg-curd-900/30 dark:text-curd-400"
                >
                  {cuisine}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        cuisines: filters.cuisines.filter((c) => c !== cuisine),
                      })
                    }
                    className="ml-1 hover:text-curd-900 dark:hover:text-curd-200"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.neighborhoods.map((neighborhood) => (
                <span
                  key={neighborhood}
                  className="inline-flex items-center gap-1 rounded-full bg-curd-100 px-3 py-1 text-sm font-medium text-curd-700 dark:bg-curd-900/30 dark:text-curd-400"
                >
                  {neighborhood}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        neighborhoods: filters.neighborhoods.filter(
                          (n) => n !== neighborhood
                        ),
                      })
                    }
                    className="ml-1 hover:text-curd-900 dark:hover:text-curd-200"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1 rounded-full bg-curd-100 px-3 py-1 text-sm font-medium text-curd-700 dark:bg-curd-900/30 dark:text-curd-400"
                >
                  {feature}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        features: filters.features.filter((f) => f !== feature),
                      })
                    }
                    className="ml-1 hover:text-curd-900 dark:hover:text-curd-200"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.dietary.map((diet) => (
                <span
                  key={diet}
                  className="inline-flex items-center gap-1 rounded-full bg-curd-100 px-3 py-1 text-sm font-medium text-curd-700 dark:bg-curd-900/30 dark:text-curd-400"
                >
                  {diet}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        dietary: filters.dietary.filter((d) => d !== diet),
                      })
                    }
                    className="ml-1 hover:text-curd-900 dark:hover:text-curd-200"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.minRating > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-curd-100 px-3 py-1 text-sm font-medium text-curd-700 dark:bg-curd-900/30 dark:text-curd-400">
                  {filters.minRating}+ rating
                  <button
                    onClick={() => setFilters({ ...filters, minRating: 0 })}
                    className="ml-1 hover:text-curd-900 dark:hover:text-curd-200"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results */}
          {viewMode === "list" ? (
            // List View
            filteredRestaurants.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.slug} {...restaurant} />
                ))}
              </div>
            ) : mockRestaurants.length === 0 ? (
              // No restaurants at all
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-4 text-6xl">🧀</div>
                <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  No Reviews Yet
                </h2>
                <p className="max-w-md text-zinc-600 dark:text-zinc-400">
                  Check back soon! New reviews drop every week as I explore
                  Madison&apos;s amazing food scene.
                </p>
              </div>
            ) : (
              // No results for current filters
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-4 text-6xl">🔍</div>
                <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  No Matching Restaurants
                </h2>
                <p className="max-w-md text-zinc-600 dark:text-zinc-400">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: [],
                      cuisines: [],
                      neighborhoods: [],
                      features: [],
                      dietary: [],
                      minRating: 0,
                      sortBy: "rating-desc",
                    })
                  }
                  className="mt-6 rounded-lg bg-curd-400 px-6 py-3 font-semibold text-zinc-900 transition-colors hover:bg-curd-500"
                >
                  Clear All Filters
                </button>
              </div>
            )
          ) : // Map View
          filteredRestaurants.length > 0 ? (
            <Suspense fallback={<div>Loading map...</div>}>
              <RestaurantMap restaurants={filteredRestaurants} />
            </Suspense>
          ) : mockRestaurants.length === 0 ? (
            <div className="flex min-h-[600px] items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-center">
                <div className="mb-4 text-6xl">🧀</div>
                <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  No Reviews Yet
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Check back soon! New reviews drop every week.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[600px] items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-center">
                <div className="mb-4 text-6xl">🔍</div>
                <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  No Matching Restaurants
                </h2>
                <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: [],
                      cuisines: [],
                      neighborhoods: [],
                      features: [],
                      dietary: [],
                      minRating: 0,
                      sortBy: "rating-desc",
                    })
                  }
                  className="rounded-lg bg-curd-400 px-6 py-3 font-semibold text-zinc-900 transition-colors hover:bg-curd-500"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
