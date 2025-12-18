# 🗺️ Curd Your Enthusiasm - Available Routes

## How to Test Routes

1. Start the dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Try any of the URLs below

## 📄 Static Pages

- `/` - Homepage
- `/about` - About page
- `/top-100` - Top 100 restaurants ranking

## 🔗 Dynamic Routes (Examples)

### Categories (SEO-optimized)
Popular searches that work:
- `/categories/date-night` - Date night restaurants
- `/categories/brunch` - Best brunch spots
- `/categories/outdoor-seating` - Outdoor dining
- `/categories/cheap-eats` - Budget-friendly
- `/categories/happy-hour` - Happy hour deals
- `/categories/best-fish-fry` - Wisconsin fish fry
- `/categories/best-burgers` - Best burgers
- `/categories/family-friendly` - Kid-friendly
- `/categories/dog-friendly` - Dog-friendly patios
- `/categories/waterfront` - Lakeside dining

**See `lib/categories.ts` for all 33+ available categories**

### Neighborhoods
- `/neighborhoods/downtown` - Downtown Madison
- `/neighborhoods/east-side` - East Side
- `/neighborhoods/west-side` - West Side
- `/neighborhoods/[any-slug]` - Any neighborhood slug

### Cuisine Types
- `/cuisine/american` - American restaurants
- `/cuisine/italian` - Italian restaurants
- `/cuisine/mexican` - Mexican restaurants
- `/cuisine/asian` - Asian restaurants
- `/cuisine/[any-type]` - Any cuisine type

### Best Of Lists
- `/best-of/brunch` - Best brunch
- `/best-of/pizza` - Best pizza
- `/best-of/tacos` - Best tacos
- `/best-of/[any-slug]` - Any "best of" list

### Individual Restaurants
- `/restaurants/[slug]` - Individual restaurant review
- Example: `/restaurants/merchant-madison` (will work once you add data)

## 🐛 Debugging

All dynamic routes now have `console.log` statements that will show in your terminal when accessed. Check your dev server terminal to see:
- Which route was accessed
- What slug/params were received

## ✅ What to Expect

- All routes will load without 404 errors
- Empty states will show until you add database data
- Console logs will confirm routes are receiving params correctly

## 🔄 Next Steps

When you connect your MySQL database:
1. Replace mock data with real database queries
2. Use the `params.slug` or `params.type` to fetch data
3. Remove console.log debugging statements

