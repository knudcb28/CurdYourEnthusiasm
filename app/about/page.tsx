import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About - Curd Your Enthusiasm',
  description: 'Learn about Curd Your Enthusiasm, Madison\'s honest restaurant review site with a cheese curd rating scale.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-zinc-900 dark:text-zinc-50">
            About Curd Your Enthusiasm
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            One food enthusiast, one mission: find the best eats in Madison 🧀
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <div className="rounded-lg bg-white p-8 dark:bg-zinc-900">
            <h2>The Mission</h2>
            <p>
              Welcome! I&apos;m on a mission to explore every corner of Madison&apos;s food scene, 
              one restaurant at a time. Every week, I visit a new spot and share my honest, 
              unfiltered thoughts—no corporate sponsorships, no filtered opinions, just real 
              reviews from a real Madison food lover.
            </p>

            <h2>Why Cheese Curds?</h2>
            <p>
              Let&apos;s be real: star ratings are boring. We&apos;re in Wisconsin, home of the cheese 
              curd! So instead of stars, I rate restaurants on a 5-cheese-curd scale. It&apos;s fun, 
              it&apos;s memorable, and it perfectly captures that Wisconsin spirit.
            </p>
            <p>
              Each restaurant gets rated on:
            </p>
            <ul>
              <li><strong>Food Quality</strong> - Taste, freshness, execution</li>
              <li><strong>Atmosphere</strong> - Décor, music, overall vibe</li>
              <li><strong>Service</strong> - Attentiveness, friendliness</li>
              <li><strong>Value</strong> - Quality relative to price</li>
              <li><strong>Creativity</strong> - Unique dishes, interesting menu</li>
            </ul>

            <h2>The Process</h2>
            <p>
              Every review is based on a real dining experience. I visit each restaurant 
              anonymously, pay for my own meal, and give my honest opinion. I take notes, 
              snap photos of the food (because if it&apos;s not photographed, did you even eat it?), 
              and write up my thoughts within a day or two while everything&apos;s still fresh in 
              my mind.
            </p>

            <h2>What to Expect</h2>
            <p>
              I&apos;m tackling all types of restaurants: hole-in-the-wall diners, trendy downtown 
              bistros, ethnic eateries, food trucks, and everything in between. Madison has an 
              incredible food scene, and I want to showcase all of it.
            </p>
            <p>
              Expect one new review every week. I&apos;m building a comprehensive guide to eating 
              in Madison, one cheese curd at a time.
            </p>

            <h2>Get Involved</h2>
            <p>
              Have a restaurant you think I should try? Send me your suggestions! I&apos;m always 
              looking for new places to explore, especially hidden gems that don&apos;t get enough 
              attention.
            </p>
            <p>
              Email me at:{' '}
              <a href="mailto:hello@curdyourenthusiasm.com">hello@curdyourenthusiasm.com</a>
            </p>

            <h2>A Developer Who Loves Food</h2>
            <p>
              By day, I&apos;m a software developer. By night (and weekends), I&apos;m exploring 
              Madison&apos;s restaurant scene. This project combines my two passions: building 
              cool web apps and discovering great food. I built this entire site from scratch 
              using Next.js, TypeScript, and a healthy dose of cheese curd enthusiasm.
            </p>
          </div>

          {/* Stats Section */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center dark:bg-zinc-900">
              <div className="text-3xl font-bold text-curd-600 dark:text-curd-400">0</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Restaurants Reviewed
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 text-center dark:bg-zinc-900">
              <div className="text-3xl font-bold text-curd-600 dark:text-curd-400">∞</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Cheese Curds Consumed
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 text-center dark:bg-zinc-900">
              <div className="text-3xl font-bold text-curd-600 dark:text-curd-400">1</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Review Per Week
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

