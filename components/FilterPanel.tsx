"use client";

import { useState } from "react";

export interface FilterState {
  priceRange: string[];
  cuisines: string[];
  neighborhoods: string[];
  features: string[];
  dietary: string[];
  minRating: number;
  sortBy: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
}

const priceOptions = [
  { value: "$", label: "$", description: "Under $15" },
  { value: "$$", label: "$$", description: "$15-30" },
  { value: "$$$", label: "$$$", description: "$30-50" },
  { value: "$$$$", label: "$$$$", description: "$50+" },
];

const cuisineOptions = [
  { value: "american", label: "American", icon: "🍔" },
  { value: "italian", label: "Italian", icon: "🍝" },
  { value: "mexican", label: "Mexican", icon: "🌮" },
  { value: "asian", label: "Asian", icon: "🍜" },
  { value: "japanese", label: "Japanese", icon: "🍣" },
  { value: "thai", label: "Thai", icon: "🌶️" },
  { value: "indian", label: "Indian", icon: "🍛" },
  { value: "mediterranean", label: "Mediterranean", icon: "🥙" },
];

const neighborhoodOptions = [
  { value: "downtown", label: "Downtown", icon: "🏙️" },
  { value: "east-side", label: "East Side", icon: "🌆" },
  { value: "west-side", label: "West Side", icon: "🏘️" },
  { value: "isthmus", label: "Isthmus", icon: "🌉" },
  { value: "near-west", label: "Near West", icon: "🏠" },
  { value: "south-madison", label: "South Madison", icon: "🌳" },
];

const featureOptions = [
  { value: "outdoor-seating", label: "Outdoor Seating", icon: "🌳" },
  { value: "date-night", label: "Date Night", icon: "💑" },
  { value: "family-friendly", label: "Family Friendly", icon: "👨‍👩‍👧‍👦" },
  { value: "good-for-groups", label: "Good for Groups", icon: "👥" },
  { value: "late-night", label: "Late Night", icon: "🌙" },
  { value: "takes-reservations", label: "Reservations", icon: "📅" },
  { value: "full-bar", label: "Full Bar", icon: "🍸" },
  { value: "craft-cocktails", label: "Craft Cocktails", icon: "🍹" },
];

const dietaryOptions = [
  { value: "vegetarian", label: "Vegetarian Options", icon: "🥗" },
  { value: "vegan", label: "Vegan Options", icon: "🌱" },
  { value: "gluten-free", label: "Gluten-Free", icon: "🌾" },
  { value: "dairy-free", label: "Dairy-Free", icon: "🥛" },
];

const sortOptions = [
  { value: "rating-desc", label: "Highest Rated" },
  { value: "rating-asc", label: "Lowest Rated" },
  { value: "date-desc", label: "Newest Reviews" },
  { value: "date-asc", label: "Oldest Reviews" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function FilterPanel({
  filters,
  onFilterChange,
  resultCount,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    onFilterChange({ ...filters, [key]: newArray });
  };

  const clearAllFilters = () => {
    onFilterChange({
      priceRange: [],
      cuisines: [],
      neighborhoods: [],
      features: [],
      dietary: [],
      minRating: 0,
      sortBy: "rating-desc",
    });
  };

  const activeFilterCount =
    filters.priceRange.length +
    filters.cuisines.length +
    filters.neighborhoods.length +
    filters.features.length +
    filters.dietary.length +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden border-b border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg bg-zinc-100 px-4 py-3 dark:bg-zinc-800"
        >
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </span>
          <span className="text-zinc-600 dark:text-zinc-400">
            {isOpen ? "▲" : "▼"}
          </span>
        </button>
      </div>

      {/* Filter Panel */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto`}
      >
        <div className="p-6 space-y-6">
          {/* Header with Clear */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                Filters
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {resultCount} restaurant{resultCount !== 1 ? "s" : ""}
              </p>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm font-medium text-curd-600 hover:text-curd-700 dark:text-curd-400 dark:hover:text-curd-300"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Sort By */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({ ...filters, sortBy: e.target.value })
              }
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Minimum Rating
            </label>
            <div className="flex flex-wrap gap-2">
              {[0, 3, 3.5, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    onFilterChange({ ...filters, minRating: rating })
                  }
                  className={`w-14 rounded-lg border px-2 py-1.5 text-sm font-medium transition-colors ${
                    filters.minRating === rating
                      ? "border-curd-500 bg-curd-50 text-curd-700 dark:bg-curd-900/30 dark:text-curd-400"
                      : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600"
                  }`}
                >
                  {rating === 0 ? "Any" : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              {priceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayFilter("priceRange", option.value)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    filters.priceRange.includes(option.value)
                      ? "border-curd-500 bg-curd-50 dark:bg-curd-900/30"
                      : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600"
                  }`}
                >
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cuisines */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Cuisine Type
            </label>
            <div className="space-y-1">
              {cuisineOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <input
                    type="checkbox"
                    checked={filters.cuisines.includes(option.value)}
                    onChange={() => toggleArrayFilter("cuisines", option.value)}
                    className="h-4 w-4 rounded border-zinc-300 text-curd-600 focus:ring-curd-500 dark:border-zinc-700"
                  />
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm text-zinc-900 dark:text-zinc-50">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Neighborhoods */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Neighborhood
            </label>
            <div className="space-y-1">
              {neighborhoodOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <input
                    type="checkbox"
                    checked={filters.neighborhoods.includes(option.value)}
                    onChange={() =>
                      toggleArrayFilter("neighborhoods", option.value)
                    }
                    className="h-4 w-4 rounded border-zinc-300 text-curd-600 focus:ring-curd-500 dark:border-zinc-700"
                  />
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm text-zinc-900 dark:text-zinc-50">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Features
            </label>
            <div className="space-y-1">
              {featureOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <input
                    type="checkbox"
                    checked={filters.features.includes(option.value)}
                    onChange={() => toggleArrayFilter("features", option.value)}
                    className="h-4 w-4 rounded border-zinc-300 text-curd-600 focus:ring-curd-500 dark:border-zinc-700"
                  />
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm text-zinc-900 dark:text-zinc-50">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Dietary Options */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Dietary Options
            </label>
            <div className="space-y-1">
              {dietaryOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <input
                    type="checkbox"
                    checked={filters.dietary.includes(option.value)}
                    onChange={() => toggleArrayFilter("dietary", option.value)}
                    className="h-4 w-4 rounded border-zinc-300 text-curd-600 focus:ring-curd-500 dark:border-zinc-700"
                  />
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm text-zinc-900 dark:text-zinc-50">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
