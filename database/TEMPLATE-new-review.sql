-- =====================================================
-- RESTAURANT REVIEW TEMPLATE
-- Copy this file and rename it for each new review
-- Example: merchant-review.sql, heritage-tavern-review.sql
-- =====================================================

-- =====================================================
-- STEP 1: TAKE NOTES DURING/AFTER YOUR VISIT
-- =====================================================
/*
RESTAURANT NAME: 
DATE & TIME: 
WHO WITH: Solo / Date / Friends / Family
OCCASION: Casual dinner / Date night / Special occasion

WHAT I ORDERED:
- 
- 
- 

FIRST IMPRESSIONS:


FOOD NOTES:
- Appetizers:
- Main dishes:
- What worked:
- What didn't:

SERVICE NOTES:
- Server name (if memorable):
- Pacing:
- Knowledge:
- Friendliness:

VIBE/ATMOSPHERE:
- Noise level:
- Crowd:
- Decor:
- Music:

PRICE:
- Total spent (per person):
- Worth it? Y/N

WOULD I GO BACK? Y/N
WHY:

WHO SHOULD GO HERE:

RATING BREAKDOWN (1-5):
- Food Quality: 
- Atmosphere: 
- Service: 
- Value: 
- Creativity: 
- Return Factor: 
- OVERALL: 
*/

-- =====================================================
-- STEP 2: ADD RESTAURANT TO DATABASE
-- =====================================================

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
  featured_image_url,
  meta_title,
  meta_description
) VALUES (
  'RESTAURANT_NAME',                    -- Full restaurant name
  'restaurant-slug',                     -- URL-friendly slug (lowercase, hyphens)
  '123 Main St, Madison, WI 53703',     -- Full address
  (SELECT id FROM neighborhoods WHERE slug = 'NEIGHBORHOOD_SLUG'), -- downtown, east-side, west-side, middleton, etc.
  (SELECT id FROM cuisines WHERE slug = 'CUISINE_SLUG'),          -- american, italian, mexican, thai, etc.
  '$$',                                 -- $, $$, $$$, or $$$$
  43.0000,                              -- Latitude (get from Google Maps)
  -89.0000,                             -- Longitude (get from Google Maps)
  'https://www.restaurant-website.com', -- Website URL (or NULL)
  '(608) 123-4567',                     -- Phone number (or NULL)
  NULL,                                 -- Featured image URL (add later or NULL)
  'RESTAURANT_NAME Madison Review - Curd Your Enthusiasm',
  'Honest review of RESTAURANT_NAME in NEIGHBORHOOD, Madison. CUISINE_TYPE food with [unique selling point].'
);

-- Get the restaurant ID for next steps
SET @restaurant_id = (SELECT id FROM restaurants WHERE slug = 'restaurant-slug');

-- =====================================================
-- STEP 3: ADD YOUR REVIEW
-- =====================================================

INSERT INTO reviews (
  restaurant_id,
  food_quality,      -- 1.0 to 5.0
  atmosphere,        -- 1.0 to 5.0
  service,           -- 1.0 to 5.0
  value,             -- 1.0 to 5.0
  creativity,        -- 1.0 to 5.0
  return_factor,     -- 1.0 to 5.0
  overall_rating,    -- 1.0 to 5.0 (your final verdict)
  review_body,
  review_snippet,
  visit_date,
  dishes_tried,
  published
) VALUES (
  @restaurant_id,
  0.0,  -- Food Quality
  0.0,  -- Atmosphere
  0.0,  -- Service
  0.0,  -- Value
  0.0,  -- Creativity
  0.0,  -- Return Factor
  0.0,  -- Overall Rating
  
  -- REVIEW BODY: This is your full review text
  -- Structure:
  -- 1. Hook (1-2 sentences) - Start with your most interesting observation
  -- 2. Setting the Scene (2-3 sentences) - When, who, vibe
  -- 3. The Food (3-4 paragraphs) - Specific details about each dish
  -- 4. The Experience (1-2 paragraphs) - Service, atmosphere, crowd
  -- 5. The Verdict (1 paragraph) - Price, would you return, who should go
  'WRITE YOUR FULL REVIEW HERE.

Use the structure from the Longtable review as a guide:
- Start with a hook
- Set the scene (when, who, vibe)
- Describe the food with SPECIFIC details (not just "good" or "delicious")
- Talk about service and atmosphere
- Be honest but not mean
- End with a clear verdict

Remember:
- Use double single quotes for apostrophes: don''t, can''t, it''s
- Be conversational and personal
- Include specific names if service was memorable
- Compare to other Madison spots when relevant
- Mention price and value',
  
  -- REVIEW SNIPPET: 1-2 sentence summary for cards (160 chars max)
  'Short, punchy summary that captures the essence of your review and makes people want to read more.',
  
  -- VISIT DATE: Format as YYYY-MM-DD
  '2024-12-17',
  
  -- DISHES TRIED: JSON array format
  '["Dish One", "Dish Two", "Dish Three", "Drink Name"]',
  
  TRUE  -- Published (TRUE to show on site, FALSE to hide)
);

-- =====================================================
-- STEP 4: ADD FEATURES/TAGS
-- =====================================================
-- Uncomment the ones that apply, delete the ones that don't

-- OCCASIONS
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'date-night'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'brunch'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'family-friendly'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'group-dining'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'business-lunch'));

-- AMENITIES
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'outdoor-seating'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'takes-reservations'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'full-bar'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'craft-cocktails'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'late-night'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'parking-available'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'pet-friendly'));

-- DIETARY
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'vegetarian'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'vegan'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'gluten-free'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'dairy-free'));

-- PRICE
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'cheap-eats'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'happy-hour'));

-- POPULAR
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'best-fish-fry'));
-- INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES (@restaurant_id, (SELECT id FROM features WHERE slug = 'cheese-curds'));

-- =====================================================
-- STEP 5: VERIFY IT WORKED
-- =====================================================

SELECT 
  r.name,
  r.slug,
  n.name as neighborhood,
  c.name as cuisine,
  r.price_range,
  rev.overall_rating,
  rev.visit_date,
  rev.review_snippet
FROM restaurants r
LEFT JOIN neighborhoods n ON r.neighborhood_id = n.id
LEFT JOIN cuisines c ON r.cuisine_id = c.id
INNER JOIN reviews rev ON r.id = rev.restaurant_id
WHERE r.slug = 'restaurant-slug';  -- Change this to your slug

-- =====================================================
-- QUICK REFERENCE: AVAILABLE OPTIONS
-- =====================================================

/*
NEIGHBORHOODS (use the slug):
- downtown
- east-side
- west-side
- north-side
- south-side
- middleton
- monona
- fitchburg
- sun-prairie

CUISINES (use the slug):
- american
- italian
- mexican
- chinese
- thai
- japanese
- indian
- vietnamese
- mediterranean
- french
- german
- korean
- pizza
- burgers
- bbq
- seafood
- breakfast-brunch

FEATURES (use the slug - see Step 4 for full list):
Occasions: date-night, brunch, family-friendly, group-dining, business-lunch
Amenities: outdoor-seating, takes-reservations, full-bar, craft-cocktails, late-night, parking-available, pet-friendly
Dietary: vegetarian, vegan, gluten-free, dairy-free
Price: cheap-eats, happy-hour
Popular: best-fish-fry, cheese-curds

PRICE RANGES:
$ = Under $15 per person
$$ = $15-30 per person
$$$ = $30-50 per person
$$$$ = $50+ per person
*/

-- =====================================================
-- PRO TIPS
-- =====================================================

/*
1. Take notes on your phone DURING the meal (yes, really)
   - Specific dish descriptions
   - First impressions
   - Service details you'll forget later

2. Take photos of:
   - The food (well-lit, not over-filtered)
   - The restaurant exterior
   - The interior/vibe
   - Your favorite dish

3. Check the menu online BEFORE going
   - See what looks interesting
   - Check prices to set expectations

4. Review structure that works:
   - Hook: Most interesting/surprising thing
   - Scene: When, who, vibe
   - Food: Specific details, not generic adjectives
   - Experience: Service, atmosphere, value
   - Verdict: Would you return? Who should go?

5. Be specific:
   - "The burger had a perfectly seared crust with a pink, juicy center" 
     > "The burger was good"
   - "Our server Laura knew every beer on tap by heart and made spot-on recommendations"
     > "Good service"

6. Include context:
   - Compare to other Madison spots
   - Mention parking situation
   - Note if reservations are needed
   - Price per person estimate

7. Be honest, not mean:
   - "The pasta was overcooked and arrived lukewarm" ✓
   - "The chef clearly doesn't know what they're doing" ✗
*/

