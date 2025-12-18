-- Curd Your Enthusiasm Database Schema
-- MySQL Database for Madison Restaurant Reviews

-- Create database
CREATE DATABASE IF NOT EXISTS curd_your_enthusiasm;
USE curd_your_enthusiasm;

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Neighborhoods Table
CREATE TABLE neighborhoods (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cuisines Table
CREATE TABLE cuisines (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Restaurants Table
CREATE TABLE restaurants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  address VARCHAR(255),
  neighborhood_id INT,
  cuisine_id INT,
  price_range ENUM('$', '$$', '$$$', '$$$$') NOT NULL,
  
  -- Location data for map
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Contact info
  website_url VARCHAR(255),
  phone VARCHAR(20),
  google_maps_url VARCHAR(255),
  
  -- Images
  featured_image_url VARCHAR(255),
  
  -- SEO fields
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods(id),
  FOREIGN KEY (cuisine_id) REFERENCES cuisines(id),
  INDEX idx_slug (slug),
  INDEX idx_neighborhood (neighborhood_id),
  INDEX idx_cuisine (cuisine_id)
);

-- Reviews Table (Your ratings and write-ups)
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  
  -- Individual ratings (1-5 scale)
  food_quality DECIMAL(2,1) CHECK (food_quality BETWEEN 1 AND 5),
  atmosphere DECIMAL(2,1) CHECK (atmosphere BETWEEN 1 AND 5),
  service DECIMAL(2,1) CHECK (service BETWEEN 1 AND 5),
  value DECIMAL(2,1) CHECK (value BETWEEN 1 AND 5),
  creativity DECIMAL(2,1) CHECK (creativity BETWEEN 1 AND 5),
  return_factor DECIMAL(2,1) CHECK (return_factor BETWEEN 1 AND 5),
  
  -- Overall rating (calculated or manual)
  overall_rating DECIMAL(2,1) NOT NULL,
  
  -- Content
  review_body TEXT NOT NULL,
  review_snippet VARCHAR(255), -- Short summary for cards
  visit_date DATE NOT NULL,
  
  -- What you ordered
  dishes_tried JSON, -- ["Fish Fry", "Cheese Curds", "Old Fashioned"]
  
  -- Status
  published BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  INDEX idx_restaurant (restaurant_id),
  INDEX idx_overall_rating (overall_rating),
  INDEX idx_visit_date (visit_date)
);

-- Review Photos Table
CREATE TABLE review_photos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  review_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  alt_text VARCHAR(255),
  caption VARCHAR(255),
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
  INDEX idx_review (review_id)
);

-- =====================================================
-- TAXONOMY TABLES (Tags & Features)
-- =====================================================

-- Features Table (outdoor seating, date night, etc.)
CREATE TABLE features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  icon VARCHAR(10), -- Emoji or icon name
  category ENUM('occasion', 'amenity', 'dietary', 'price', 'popular') DEFAULT 'amenity',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restaurant Features Junction Table
CREATE TABLE restaurant_features (
  restaurant_id INT,
  feature_id INT,
  PRIMARY KEY (restaurant_id, feature_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  FOREIGN KEY (feature_id) REFERENCES features(id) ON DELETE CASCADE
);

-- =====================================================
-- "BEST OF" LISTS
-- =====================================================

-- Best Of Lists Table
CREATE TABLE best_of_lists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug)
);

-- Best Of List Items
CREATE TABLE best_of_list_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  list_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  ranking INT NOT NULL,
  blurb TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (list_id) REFERENCES best_of_lists(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  INDEX idx_list (list_id),
  INDEX idx_ranking (ranking)
);

-- =====================================================
-- SEED DATA - Insert Basic Categories
-- =====================================================

-- Insert Neighborhoods
INSERT INTO neighborhoods (name, slug, description) VALUES
('Downtown', 'downtown', 'The heart of Madison with State Street and Capitol Square'),
('East Side', 'east-side', 'Eclectic neighborhoods east of the Yahara River'),
('West Side', 'west-side', 'West of campus with great local spots'),
('Isthmus', 'isthmus', 'The strip between Lakes Mendota and Monona'),
('Near West', 'near-west', 'Near west side neighborhoods'),
('South Madison', 'south-madison', 'South side of Madison');

-- Insert Cuisines
INSERT INTO cuisines (name, slug) VALUES
('American', 'american'),
('Italian', 'italian'),
('Mexican', 'mexican'),
('Asian', 'asian'),
('Japanese', 'japanese'),
('Thai', 'thai'),
('Indian', 'indian'),
('Mediterranean', 'mediterranean'),
('Chinese', 'chinese'),
('Vietnamese', 'vietnamese'),
('Korean', 'korean'),
('Pizza', 'pizza'),
('Burgers', 'burgers'),
('Breakfast/Brunch', 'breakfast-brunch'),
('Seafood', 'seafood');

-- Insert Features/Tags
INSERT INTO features (name, slug, icon, category) VALUES
-- Occasions
('Date Night', 'date-night', '💑', 'occasion'),
('Brunch', 'brunch', '🥞', 'occasion'),
('Family Friendly', 'family-friendly', '👨‍👩‍👧‍👦', 'occasion'),
('Group Dining', 'group-dining', '👥', 'occasion'),
('Business Lunch', 'business-lunch', '💼', 'occasion'),

-- Amenities
('Outdoor Seating', 'outdoor-seating', '🌳', 'amenity'),
('Takes Reservations', 'takes-reservations', '📅', 'amenity'),
('Full Bar', 'full-bar', '🍸', 'amenity'),
('Craft Cocktails', 'craft-cocktails', '🍹', 'amenity'),
('Late Night', 'late-night', '🌙', 'amenity'),
('Parking Available', 'parking-available', '🅿️', 'amenity'),
('Pet Friendly', 'pet-friendly', '🐕', 'amenity'),

-- Dietary
('Vegetarian Options', 'vegetarian', '🥗', 'dietary'),
('Vegan Options', 'vegan', '🌱', 'dietary'),
('Gluten-Free', 'gluten-free', '🌾', 'dietary'),
('Dairy-Free', 'dairy-free', '🥛', 'dietary'),

-- Price
('Cheap Eats', 'cheap-eats', '💵', 'price'),
('Happy Hour', 'happy-hour', '🍻', 'price'),

-- Popular
('Best Fish Fry', 'best-fish-fry', '🐟', 'popular'),
('Cheese Curds', 'cheese-curds', '🧀', 'popular');

-- =====================================================
-- USEFUL VIEWS
-- =====================================================

-- View: Restaurants with all their data
CREATE VIEW v_restaurants_full AS
SELECT 
  r.*,
  n.name as neighborhood_name,
  n.slug as neighborhood_slug,
  c.name as cuisine_name,
  c.slug as cuisine_slug,
  rev.overall_rating,
  rev.food_quality,
  rev.atmosphere,
  rev.service,
  rev.value,
  rev.creativity,
  rev.return_factor,
  rev.review_snippet,
  rev.visit_date
FROM restaurants r
LEFT JOIN neighborhoods n ON r.neighborhood_id = n.id
LEFT JOIN cuisines c ON r.cuisine_id = c.id
LEFT JOIN reviews rev ON r.id = rev.restaurant_id AND rev.published = TRUE;

-- View: Top rated restaurants
CREATE VIEW v_top_restaurants AS
SELECT 
  r.id,
  r.name,
  r.slug,
  n.name as neighborhood,
  c.name as cuisine,
  r.price_range,
  rev.overall_rating,
  r.featured_image_url,
  rev.review_snippet
FROM restaurants r
INNER JOIN reviews rev ON r.id = rev.restaurant_id AND rev.published = TRUE
LEFT JOIN neighborhoods n ON r.neighborhood_id = n.id
LEFT JOIN cuisines c ON r.cuisine_id = c.id
ORDER BY rev.overall_rating DESC, rev.visit_date DESC;

