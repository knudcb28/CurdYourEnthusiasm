"use client";

import { useState, useEffect } from "react";

interface Restaurant {
  slug: string;
  name: string;
  neighborhood: string;
  cuisine: string;
}

interface RestaurantSelectorProps {
  selectedSlugs: string[];
  onSelect: (slugs: string[]) => void;
  maxSelections?: number;
}

export default function RestaurantSelector({
  selectedSlugs,
  onSelect,
  maxSelections = 3,
}: RestaurantSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Replace with actual MySQL query
  const allRestaurants: Restaurant[] = [
    // Will be populated from database
  ];

  const filteredRestaurants = allRestaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      onSelect(selectedSlugs.filter((s) => s !== slug));
    } else if (selectedSlugs.length < maxSelections) {
      onSelect([...selectedSlugs, slug]);
    }
  };

  const selectedRestaurants = allRestaurants.filter((r) =>
    selectedSlugs.includes(r.slug)
  );

  return (
    <div className="space-y-4">
      {/* Selected Restaurants */}
      {selectedRestaurants.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedRestaurants.map((restaurant) => (
            <div
              key={restaurant.slug}
              className="flex items-center gap-2 rounded-lg border border-curd-200 bg-curd-50 px-3 py-2 dark:border-curd-800 dark:bg-curd-900/30"
            >
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {restaurant.name}
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  {restaurant.neighborhood} • {restaurant.cuisine}
                </div>
              </div>
              <button
                onClick={() => handleToggle(restaurant.slug)}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search/Add */}
      {selectedSlugs.length < maxSelections && (
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={`Search restaurants to compare (${selectedSlugs.length}/${maxSelections} selected)`}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />

          {/* Dropdown */}
          {isOpen && searchQuery && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />

              {/* Results */}
              <div className="absolute z-20 mt-2 max-h-96 w-full overflow-y-auto rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                {filteredRestaurants.length > 0 ? (
                  filteredRestaurants.map((restaurant) => {
                    const isSelected = selectedSlugs.includes(restaurant.slug);
                    const isDisabled =
                      !isSelected && selectedSlugs.length >= maxSelections;

                    return (
                      <button
                        key={restaurant.slug}
                        onClick={() => {
                          if (!isDisabled) {
                            handleToggle(restaurant.slug);
                            setSearchQuery("");
                            setIsOpen(false);
                          }
                        }}
                        disabled={isDisabled}
                        className={`w-full border-b border-zinc-100 px-4 py-3 text-left transition-colors last:border-b-0 dark:border-zinc-800 ${
                          isSelected
                            ? "bg-curd-50 dark:bg-curd-900/30"
                            : isDisabled
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                              {restaurant.name}
                            </div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                              {restaurant.neighborhood} • {restaurant.cuisine}
                            </div>
                          </div>
                          {isSelected && (
                            <span className="text-curd-600 dark:text-curd-400">
                              ✓
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-8 text-center text-zinc-600 dark:text-zinc-400">
                    No restaurants found
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {allRestaurants.length === 0 && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-2 text-4xl">🧀</div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No restaurants reviewed yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}

