-- =====================================================
-- Add Review for Longtable Beer Cafe
-- (Restaurant already exists in database)
-- =====================================================

-- Get the restaurant ID
SET @longtable_id = (SELECT id FROM restaurants WHERE slug = 'longtable-beer-cafe');

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
  @longtable_id,
  4.2,  -- Food Quality
  4.5,  -- Atmosphere
  4.8,  -- Service
  3.5,  -- Value (salad was small for the price)
  4.0,  -- Creativity
  4.5,  -- Return Factor
  4.0,  -- Overall Rating
  'Longtable Beer Cafe sits in a Middleton strip mall, which sounds like the setup to a joke about Wisconsin dining. But here''s the punchline: this place is legitimately great, and the unassuming exterior just means more seats for those of us who know better.

I rolled in solo on a Tuesday around 6 PM—that golden hour when you''re hungry enough to order appetizers but early enough to snag a bar seat without a wait. The space has that modern-farmhouse-meets-beer-hall vibe: lots of warm wood, Edison bulbs that aren''t trying too hard, and a long communal table running down the center that actually gets used (I saw a group of six strangers gradually become friends over the course of an hour, which was adorable).

**The Food**

Let''s address the elephant in the room first: I ordered cheese curds at a place called Curd Your Enthusiasm. The meta levels here are off the charts. These curds were textbook Wisconsin—beer-battered, served piping hot with that perfect cheese pull, and accompanied by a tangy dipping sauce that I''m pretty sure was crack in disguise. The batter was light and crispy without being greasy, and the curds themselves were high-quality, squeaky, and generous. If you come to Longtable and don''t order these, we can''t be friends.

For my "main" (I''m using that term loosely since I basically made a meal of apps), I went with the goat cheese and beet salad. Here''s where I have to be honest: it was delicious but small. Like, "I''m glad I also ordered cheese curds" small. The components were all there—roasted beets that were perfectly tender, creamy goat cheese, candied walnuts, and a balsamic that had clearly never seen the inside of a grocery store bottle. Everything tasted fresh and thoughtfully prepared. But for the price point, I was expecting... more salad. It''s the kind of portion that works great as a starter to share, less great as a solo dinner entrée.

**The Beer**

I paired everything with an Abt 12 on tap, because apparently I was feeling fancy. For the uninitiated, that''s a Belgian quadrupel—rich, complex, and about 10% ABV, so it''s basically a meal in itself. Longtable''s tap list is legitimately impressive, heavy on Wisconsin craft breweries with some well-chosen Belgian and European options. The fact that they had Abt 12 on draft earned them major points in my book.

**The Experience**

This is where Longtable really shines. The vibe is exactly what a neighborhood spot should be: laid-back but not sloppy, welcoming but not trying to be your best friend. I sat at the bar and got to chat with Justin, the bar manager, who was one of those rare bartenders who can read the room perfectly—friendly and engaged when you want conversation, professionally invisible when you''re clearly just there to decompress with beer and cheese curds.

The staff across the board seemed genuinely happy to be there, which is increasingly rare in the restaurant industry. My water glass never went empty, the pacing was perfect, and when I asked for a recommendation between two beers, I got an actual thoughtful answer instead of "they''re both good."

The crowd was a mix of Middleton families wrapping up early dinners, a few couples on low-key date nights, and solo diners like me who''d clearly discovered this place and kept coming back. Noise level was conversational—lively without being loud.

**The Verdict**

Dinner ran me about $45 with tip (cheese curds, salad, and one very good beer). Not cheap, but not unreasonable for the quality.

Would I go back? Absolutely. Next time I''ll probably skip the salad and go straight for an entrée, but that''s a small quibble. Longtable is the kind of place that makes me wish I lived in Middleton instead of just passing through. It''s perfect for a solo weeknight dinner when you want good food without the production of a "nice" restaurant, or a casual dinner with friends where the beer list does half the entertaining for you.

**Bottom line:** Longtable is proof that strip mall restaurants can have soul. Great beer, solid food, and a staff that actually seems to give a damn. The salad could be bigger, but everything else hits the mark.',
  'Middleton''s hidden gem nails the neighborhood restaurant vibe with excellent beer, solid food, and standout service. The cheese curds alone are worth the trip.',
  '2024-12-17',
  '["Cheese Curds", "Goat Cheese & Beet Salad", "Abt 12 (Belgian Quad)"]',
  TRUE
);

-- Add features/tags
INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES
(@longtable_id, (SELECT id FROM features WHERE slug = 'outdoor-seating')),
(@longtable_id, (SELECT id FROM features WHERE slug = 'takes-reservations')),
(@longtable_id, (SELECT id FROM features WHERE slug = 'full-bar')),
(@longtable_id, (SELECT id FROM features WHERE slug = 'family-friendly')),
(@longtable_id, (SELECT id FROM features WHERE slug = 'parking-available')),
(@longtable_id, (SELECT id FROM features WHERE slug = 'happy-hour'));

-- Add dietary options
INSERT INTO restaurant_features (restaurant_id, feature_id) VALUES
(@longtable_id, (SELECT id FROM features WHERE slug = 'vegetarian')),
(@longtable_id, (SELECT id FROM features WHERE slug = 'gluten-free'));

-- Verify the review was added
SELECT 
  r.name,
  r.slug,
  n.name as neighborhood,
  c.name as cuisine,
  rev.overall_rating,
  rev.visit_date,
  rev.review_snippet
FROM restaurants r
LEFT JOIN neighborhoods n ON r.neighborhood_id = n.id
LEFT JOIN cuisines c ON r.cuisine_id = c.id
INNER JOIN reviews rev ON r.id = rev.restaurant_id
WHERE r.slug = 'longtable-beer-cafe';

