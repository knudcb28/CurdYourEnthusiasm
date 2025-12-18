import { Metadata } from 'next';
import RestaurantCard from '@/components/RestaurantCard';

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const cuisineName = type.charAt(0).toUpperCase() + type.slice(1);
  
  return {
    title: `Best ${cuisineName} Restaurants in Madison, WI`,
    description: `Find the best ${cuisineName} restaurants in Madison. Honest reviews and cheese curd ratings.`,
  };
}

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

export default async function CuisinePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const cuisineName = type.charAt(0).toUpperCase() + type.slice(1);
  
  // TODO: Fetch from MySQL
  const restaurants: Restaurant[] = [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          {cuisineName} Restaurants in Madison
        </h1>
        
        {restaurants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.slug} {...restaurant} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            No {cuisineName.toLowerCase()} restaurants reviewed yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}

