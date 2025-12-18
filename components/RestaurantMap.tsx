"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import CurdRating from "./CurdRating";

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Restaurant {
  slug: string;
  name: string;
  neighborhood: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  latitude: number;
  longitude: number;
  reviewSnippet?: string;
}

interface RestaurantMapProps {
  restaurants: Restaurant[];
}

// Custom marker icons based on rating
const createCustomIcon = (rating: number) => {
  const color =
    rating >= 4.5
      ? "#10b981" // green
      : rating >= 4
      ? "#3b82f6" // blue
      : rating >= 3.5
      ? "#f59e0b" // amber
      : "#ef4444"; // red

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-size: 16px;
          font-weight: bold;
        ">🧀</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Component to fit map bounds to restaurants
function MapBounds({ restaurants }: { restaurants: Restaurant[] }) {
  const map = useMap();

  useEffect(() => {
    if (restaurants.length > 0) {
      const bounds = L.latLngBounds(
        restaurants.map((r) => [r.latitude, r.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [restaurants, map]);

  return null;
}

export default function RestaurantMap({ restaurants }: RestaurantMapProps) {
  const [mounted, setMounted] = useState(false);

  // Madison, WI coordinates
  const madisonCenter: [number, number] = [43.0731, -89.4012];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-full min-h-[600px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="text-center">
          <div className="mb-2 text-4xl">🗺️</div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Loading map...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[600px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <MapContainer
        center={madisonCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.slug}
            position={[restaurant.latitude, restaurant.longitude]}
            icon={createCustomIcon(restaurant.rating)}
          >
            <Popup>
              <div className="min-w-[200px] p-2">
                <Link
                  href={`/restaurants/${restaurant.slug}`}
                  className="group block"
                >
                  <h3 className="mb-1 text-lg font-bold text-zinc-900 group-hover:text-curd-600">
                    {restaurant.name}
                  </h3>
                </Link>
                <div className="mb-2 flex items-center gap-2 text-sm text-zinc-600">
                  <span>{restaurant.neighborhood}</span>
                  <span>•</span>
                  <span>{restaurant.cuisine}</span>
                  <span>•</span>
                  <span>{restaurant.priceRange}</span>
                </div>
                <div className="mb-2">
                  <CurdRating rating={restaurant.rating} size="sm" showNumber />
                </div>
                {restaurant.reviewSnippet && (
                  <p className="mb-3 line-clamp-2 text-sm text-zinc-700">
                    {restaurant.reviewSnippet}
                  </p>
                )}
                <Link
                  href={`/restaurants/${restaurant.slug}`}
                  className="inline-block rounded bg-curd-400 px-3 py-1 text-sm font-semibold text-zinc-900 hover:bg-curd-500"
                >
                  View Review →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}

        {restaurants.length > 0 && <MapBounds restaurants={restaurants} />}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] rounded-lg border border-zinc-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/95">
        <h4 className="mb-2 text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
          Rating Legend
        </h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded-full bg-[#10b981]"></div>
            <span className="text-zinc-700 dark:text-zinc-300">4.5+ Excellent</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded-full bg-[#3b82f6]"></div>
            <span className="text-zinc-700 dark:text-zinc-300">4.0+ Great</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded-full bg-[#f59e0b]"></div>
            <span className="text-zinc-700 dark:text-zinc-300">3.5+ Good</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded-full bg-[#ef4444]"></div>
            <span className="text-zinc-700 dark:text-zinc-300">&lt;3.5 Fair</span>
          </div>
        </div>
      </div>

      {/* Restaurant count */}
      <div className="absolute left-4 top-4 z-[1000] rounded-lg border border-zinc-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/95">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {restaurants.length} restaurant{restaurants.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

