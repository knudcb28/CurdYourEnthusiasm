import { Metadata } from 'next';
import RestaurantCard from '@/components/RestaurantCard';

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
  const cuisineName = params.type.charAt(0).toUpperCase() + params.type.slice(1);
  
  return {
    title: `Best ${cuisineName} Restaurants in Madison, WI`,
    description: `Find the best ${cuisineName} restaurants in Madison. Honest reviews and cheese curd ratings.`,
  };
}

export default async function CuisinePage({ params }: { params: { type: string } }) {
  const cuisineName = params.type.charAt(0).toUpperCase() + params.type.slice(1);
  
  // TODO: Fetch from MySQL
  const restaurants: any[] = [];

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

