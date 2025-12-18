import { Metadata } from 'next';
import RestaurantCard from '@/components/RestaurantCard';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  // TODO: Fetch list title from database using slug
  const listTitle = 'Best Brunch Spots in Madison';
  console.log('Best-of slug:', slug); // For debugging
  
  return {
    title: `${listTitle} - Curd Your Enthusiasm`,
    description: `Discover ${listTitle.toLowerCase()}. Honest reviews and ratings from a local food enthusiast.`,
  };
}

export default async function BestOfPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // TODO: Fetch list and restaurants from MySQL using slug
  console.log('Best-of slug:', slug); // For debugging
  const list = {
    title: 'Best Brunch Spots in Madison',
    description: 'These are my top picks for brunch in Madison. From classic American to creative fusion, these spots deliver every time.',
    restaurants: []
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          {list.title}
        </h1>
        <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
          {list.description}
        </p>
        
        {list.restaurants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.restaurants.map((restaurant: any) => (
              <RestaurantCard key={restaurant.slug} {...restaurant} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            This list is coming soon!
          </p>
        )}
      </div>
    </div>
  );
}

