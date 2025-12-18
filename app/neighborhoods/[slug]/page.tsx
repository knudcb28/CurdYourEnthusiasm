import { Metadata } from 'next';
import RestaurantCard from '@/components/RestaurantCard';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const neighborhoodName = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return {
    title: `Best Restaurants in ${neighborhoodName}, Madison WI`,
    description: `Discover the best restaurants in ${neighborhoodName}, Madison. Honest reviews rated on a cheese curd scale.`,
  };
}

export default async function NeighborhoodPage({ params }: { params: { slug: string } }) {
  const neighborhoodName = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // TODO: Fetch restaurants from MySQL
  // const restaurants = await db.query('SELECT * FROM restaurants WHERE neighborhood_slug = ?', [params.slug]);
  
  const restaurants: any[] = []; // Replace with DB data

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          Restaurants in {neighborhoodName}
        </h1>
        
        {restaurants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.slug} {...restaurant} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            No restaurants reviewed in this neighborhood yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}

