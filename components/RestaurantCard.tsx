'use client';

import Link from 'next/link';
import Image from 'next/image';
import CurdRating from './CurdRating';
import { useRouter } from 'next/navigation';

interface RestaurantCardProps {
  slug: string;
  name: string;
  neighborhood: string;
  cuisine: string;
  rating: number;
  imageUrl?: string;
  reviewSnippet?: string;
  visitDate?: string;
}

export default function RestaurantCard({
  slug,
  name,
  neighborhood,
  cuisine,
  rating,
  imageUrl,
  reviewSnippet,
  visitDate
}: RestaurantCardProps) {
  const router = useRouter();

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/compare?restaurants=${slug}`);
  };

  return (
    <Link href={`/restaurants/${slug}`} className="group">
      <article className="relative h-full overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-curd-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-curd-900/30">
        {/* Compare Button */}
        <button
          onClick={handleCompare}
          className="absolute right-3 top-3 z-10 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-700 opacity-0 shadow-lg backdrop-blur-sm transition-all hover:bg-curd-400 hover:text-zinc-900 group-hover:opacity-100 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-curd-400 dark:hover:text-zinc-900"
          title="Add to compare"
        >
          ⚖️ Compare
        </button>
        {imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={imageUrl}
              alt={`${name} - restaurant photo`}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
        )}
        
        <div className="p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-zinc-900 transition-colors group-hover:text-curd-600 dark:text-zinc-50 dark:group-hover:text-curd-400">
                {name}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                  📍 {neighborhood}
                </span>
                <span className="text-zinc-400">•</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {cuisine}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mb-3">
            <CurdRating rating={rating} size="sm" showNumber />
          </div>
          
          {reviewSnippet && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {reviewSnippet}
            </p>
          )}
          
          {visitDate && (
            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">
                📅 {new Date(visitDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <span className="text-xs font-medium text-curd-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-curd-400">
                Read review →
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

