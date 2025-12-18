# Database Setup Guide

## Step 1: Create Database in MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open the `schema.sql` file
4. Click the **⚡ Execute** button to run all statements
5. You should see:
   - Database `curd_your_enthusiasm` created
   - 13 tables created
   - Seed data inserted (neighborhoods, cuisines, features)
   - 2 views created

## Step 2: Verify Tables Were Created

Run this query to check:

```sql
USE curd_your_enthusiasm;
SHOW TABLES;
```

You should see:
- `best_of_list_items`
- `best_of_lists`
- `cuisines`
- `features`
- `neighborhoods`
- `restaurant_features`
- `restaurants`
- `review_photos`
- `reviews`
- Plus 2 views: `v_restaurants_full`, `v_top_restaurants`

## Step 3: Create Your First Restaurant

Here's an example SQL to add your first restaurant:

```sql
-- Example: Adding Merchant (Downtown Madison)
INSERT INTO restaurants (
  name, 
  slug, 
  address,
  neighborhood_id, 
  cuisine_id, 
  price_range,
  latitude,
  longitude,
  website_url,
  phone,
  meta_title,
  meta_description
) VALUES (
  'Merchant',
  'merchant-madison',
  '121 S Pinckney St, Madison, WI 53703',
  (SELECT id FROM neighborhoods WHERE slug = 'downtown'),
  (SELECT id FROM cuisines WHERE slug = 'american'),
  '$$$',
  43.0735,
  -89.3850,
  'https://www.merchantmadison.com',
  '(608) 259-9799',
  'Merchant Madison Restaurant Review',
  'Honest review of Merchant in downtown Madison. American cuisine with seasonal ingredients.'
);
```

## Step 4: Add Your First Review

```sql
-- Get the restaurant ID first
SET @restaurant_id = (SELECT id FROM restaurants WHERE slug = 'merchant-madison');

-- Add your review
INSERT INTO reviews (
  restaurant_id,
  food_quality,
  atmosphere,
  service,
  value,
  creativity,
  return_factor,
  overall_rating,
  review_body,
  review_snippet,
  visit_date,
  dishes_tried,
  published
) VALUES (
  @restaurant_id,
  4.5,  -- Food Quality
  4.0,  -- Atmosphere
  4.5,  -- Service
  4.0,  -- Value
  5.0,  -- Creativity
  5.0,  -- Return Factor
  4.5,  -- Overall Rating
  'Full review text here... Talk about the ambiance, service, what you ordered, etc.',
  'Incredible brunch spot with a rotating menu. The duck hash is absolutely worth the hype.',
  '2024-12-17',
  '["Duck Hash", "Cheese Curds", "Old Fashioned"]',
  TRUE  -- Published
);
```

## Step 5: Add Features/Tags to Restaurant

```sql
-- Add features (outdoor seating, takes reservations, etc.)
SET @restaurant_id = (SELECT id FROM restaurants WHERE slug = 'merchant-madison');

INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES
(@restaurant_id, (SELECT id FROM features WHERE slug = 'outdoor-seating')),
(@restaurant_id, (SELECT id FROM features WHERE slug = 'takes-reservations')),
(@restaurant_id, (SELECT id FROM features WHERE slug = 'craft-cocktails')),
(@restaurant_id, (SELECT id FROM features WHERE slug = 'date-night')),
(@restaurant_id, (SELECT id FROM features WHERE slug = 'vegetarian')),
(@restaurant_id, (SELECT id FROM features WHERE slug = 'gluten-free'));
```

## Step 6: View Your Data

```sql
-- See all restaurants with reviews
SELECT * FROM v_restaurants_full;

-- See top rated restaurants
SELECT * FROM v_top_restaurants;

-- Get a specific restaurant with all details
SELECT 
  r.*,
  n.name as neighborhood,
  c.name as cuisine,
  rev.*
FROM restaurants r
LEFT JOIN neighborhoods n ON r.neighborhood_id = n.id
LEFT JOIN cuisines c ON r.cuisine_id = c.id
LEFT JOIN reviews rev ON r.id = rev.restaurant_id
WHERE r.slug = 'merchant-madison';
```

## Next Steps

Once you have data in the database:

1. Install `mysql2` package: `npm install mysql2`
2. Create database connection file (`lib/db.ts`)
3. Update API routes or server components to fetch from MySQL
4. Test locally to see real data!

## Quick Reference: Table Relationships

```
restaurants
  ├─ neighborhood_id → neighborhoods
  ├─ cuisine_id → cuisines
  └─ Has Many:
      ├─ reviews (1-to-1, since only you review)
      ├─ review_photos (through reviews)
      └─ restaurant_features → features

reviews
  ├─ restaurant_id → restaurants
  └─ Has Many:
      └─ review_photos
```

## Helpful Queries

```sql
-- Count restaurants by neighborhood
SELECT n.name, COUNT(r.id) as restaurant_count
FROM neighborhoods n
LEFT JOIN restaurants r ON n.id = r.neighborhood_id
GROUP BY n.id, n.name;

-- Average rating by cuisine
SELECT c.name, AVG(rev.overall_rating) as avg_rating, COUNT(r.id) as count
FROM cuisines c
LEFT JOIN restaurants r ON c.id = r.cuisine_id
LEFT JOIN reviews rev ON r.id = rev.restaurant_id AND rev.published = TRUE
GROUP BY c.id, c.name
HAVING count > 0
ORDER BY avg_rating DESC;

-- Restaurants missing reviews
SELECT r.name, r.slug
FROM restaurants r
LEFT JOIN reviews rev ON r.id = rev.restaurant_id
WHERE rev.id IS NULL;
```

