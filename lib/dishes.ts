// Popular dishes to search for - high-intent SEO targets

export interface Dish {
  slug: string;
  name: string;
  icon: string;
  description: string;
  searchTerms: string[];
  metaTitle: string;
  metaDescription: string;
}

export const popularDishes: Dish[] = [
  {
    slug: 'fish-fry',
    name: 'Fish Fry',
    icon: '🐟',
    description: 'The quintessential Wisconsin Friday tradition - crispy fried fish with all the fixings',
    searchTerms: ['best fish fry madison', 'friday fish fry', 'fried fish madison'],
    metaTitle: 'Best Fish Fry in Madison, WI - Top Rated Reviews',
    metaDescription: 'Find the best fish fry in Madison, WI. Honest reviews of Friday fish fry spots rated on a cheese curd scale. Discover your new favorite Wisconsin tradition.'
  },
  {
    slug: 'cheese-curds',
    name: 'Cheese Curds',
    icon: '🧀',
    description: 'Wisconsin\'s iconic snack - fresh, squeaky, and perfectly fried',
    searchTerms: ['best cheese curds madison', 'fried cheese curds', 'cheese curds near me'],
    metaTitle: 'Best Cheese Curds in Madison, WI - Squeaky Fresh Reviews',
    metaDescription: 'Discover the best cheese curds in Madison, WI. From squeaky fresh to perfectly fried, find your ideal Wisconsin cheese curd spot.'
  },
  {
    slug: 'old-fashioned',
    name: 'Old Fashioned',
    icon: '🥃',
    description: 'Wisconsin\'s signature cocktail - brandy-based and uniquely ours',
    searchTerms: ['best old fashioned madison', 'wisconsin old fashioned', 'brandy old fashioned'],
    metaTitle: 'Best Old Fashioned in Madison, WI - Wisconsin\'s Classic Cocktail',
    metaDescription: 'Find the best Old Fashioned cocktails in Madison, WI. Reviews of the classic Wisconsin brandy old fashioned - sweet, sour, and everything in between.'
  },
  {
    slug: 'pizza',
    name: 'Pizza',
    icon: '🍕',
    description: 'From Neapolitan to New York style, Madison\'s best pizza spots',
    searchTerms: ['best pizza madison', 'pizza near me', 'madison pizza restaurants'],
    metaTitle: 'Best Pizza in Madison, WI - Top Pizza Restaurants Reviewed',
    metaDescription: 'Find the best pizza in Madison, WI. Honest reviews of pizzerias from wood-fired Neapolitan to classic New York style slices.'
  },
  {
    slug: 'burger',
    name: 'Burger',
    icon: '🍔',
    description: 'Juicy, flavorful burgers from smash patties to gourmet creations',
    searchTerms: ['best burger madison', 'madison burgers', 'best hamburger madison'],
    metaTitle: 'Best Burgers in Madison, WI - Top Burger Spots Reviewed',
    metaDescription: 'Discover the best burgers in Madison, WI. From classic smash burgers to gourmet creations, find your perfect burger spot.'
  },
  {
    slug: 'tacos',
    name: 'Tacos',
    icon: '🌮',
    description: 'Authentic street tacos to creative fusion - Madison\'s taco scene',
    searchTerms: ['best tacos madison', 'mexican food madison', 'street tacos madison'],
    metaTitle: 'Best Tacos in Madison, WI - Authentic & Creative Taco Spots',
    metaDescription: 'Find the best tacos in Madison, WI. From authentic street tacos to creative fusion, discover Madison\'s top taco destinations.'
  },
  {
    slug: 'sushi',
    name: 'Sushi',
    icon: '🍣',
    description: 'Fresh sushi, creative rolls, and authentic sashimi in Madison',
    searchTerms: ['best sushi madison', 'sushi restaurants madison', 'fresh sushi madison'],
    metaTitle: 'Best Sushi in Madison, WI - Top Japanese Restaurants',
    metaDescription: 'Discover the best sushi in Madison, WI. Reviews of top sushi restaurants featuring fresh fish, creative rolls, and authentic Japanese cuisine.'
  },
  {
    slug: 'ramen',
    name: 'Ramen',
    icon: '🍜',
    description: 'Steaming bowls of tonkotsu, miso, and shoyu ramen',
    searchTerms: ['best ramen madison', 'ramen restaurants madison', 'japanese noodles madison'],
    metaTitle: 'Best Ramen in Madison, WI - Top Ramen Restaurants Reviewed',
    metaDescription: 'Find the best ramen in Madison, WI. Reviews of authentic ramen shops serving rich tonkotsu, savory miso, and classic shoyu bowls.'
  },
  {
    slug: 'fried-chicken',
    name: 'Fried Chicken',
    icon: '🍗',
    description: 'Crispy, juicy fried chicken done right - from classic to Nashville hot',
    searchTerms: ['best fried chicken madison', 'chicken restaurants madison', 'nashville hot chicken'],
    metaTitle: 'Best Fried Chicken in Madison, WI - Crispy & Delicious',
    metaDescription: 'Discover the best fried chicken in Madison, WI. From classic Southern-style to Nashville hot, find your perfect crispy chicken spot.'
  },
  {
    slug: 'pho',
    name: 'Pho',
    icon: '🥢',
    description: 'Authentic Vietnamese pho - aromatic broth and fresh ingredients',
    searchTerms: ['best pho madison', 'vietnamese food madison', 'pho restaurants madison'],
    metaTitle: 'Best Pho in Madison, WI - Authentic Vietnamese Cuisine',
    metaDescription: 'Find the best pho in Madison, WI. Reviews of authentic Vietnamese restaurants serving steaming bowls of pho with aromatic broth and fresh herbs.'
  },
  {
    slug: 'breakfast-sandwich',
    name: 'Breakfast Sandwich',
    icon: '🥪',
    description: 'The perfect start to your day - egg, cheese, and your choice of protein',
    searchTerms: ['best breakfast sandwich madison', 'breakfast spots madison', 'morning sandwich'],
    metaTitle: 'Best Breakfast Sandwiches in Madison, WI - Morning Must-Haves',
    metaDescription: 'Discover the best breakfast sandwiches in Madison, WI. Find your perfect morning sandwich with eggs, cheese, and all the fixings.'
  },
  {
    slug: 'wings',
    name: 'Chicken Wings',
    icon: '🍗',
    description: 'Saucy, crispy wings in every flavor imaginable',
    searchTerms: ['best wings madison', 'chicken wings madison', 'buffalo wings madison'],
    metaTitle: 'Best Chicken Wings in Madison, WI - Top Wing Spots',
    metaDescription: 'Find the best chicken wings in Madison, WI. Reviews of wing joints serving crispy, saucy wings from buffalo to BBQ and beyond.'
  },
  {
    slug: 'bbq',
    name: 'BBQ',
    icon: '🍖',
    description: 'Slow-smoked meats and authentic barbecue flavors',
    searchTerms: ['best bbq madison', 'barbecue madison', 'smoked meat madison'],
    metaTitle: 'Best BBQ in Madison, WI - Top Barbecue Restaurants',
    metaDescription: 'Discover the best BBQ in Madison, WI. Reviews of barbecue spots serving slow-smoked brisket, ribs, pulled pork, and more.'
  },
  {
    slug: 'ice-cream',
    name: 'Ice Cream',
    icon: '🍦',
    description: 'Creamy scoops, unique flavors, and frozen Wisconsin treats',
    searchTerms: ['best ice cream madison', 'ice cream shops madison', 'gelato madison'],
    metaTitle: 'Best Ice Cream in Madison, WI - Top Scoop Shops',
    metaDescription: 'Find the best ice cream in Madison, WI. Reviews of ice cream shops, gelato spots, and frozen treat destinations with unique flavors.'
  },
  {
    slug: 'bloody-mary',
    name: 'Bloody Mary',
    icon: '🍅',
    description: 'Wisconsin\'s legendary brunch cocktail - the more garnishes, the better',
    searchTerms: ['best bloody mary madison', 'brunch cocktails madison', 'bloody mary bar'],
    metaTitle: 'Best Bloody Mary in Madison, WI - Epic Brunch Cocktails',
    metaDescription: 'Discover the best Bloody Mary cocktails in Madison, WI. Find bars and restaurants serving legendary Wisconsin Bloody Marys with over-the-top garnishes.'
  }
];

// Helper to get dish by slug
export function getDishBySlug(slug: string): Dish | undefined {
  return popularDishes.find(dish => dish.slug === slug);
}

// Get featured dishes for homepage
export function getFeaturedDishes(count: number = 6): Dish[] {
  return popularDishes.slice(0, count);
}

