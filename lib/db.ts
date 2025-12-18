// MySQL Database Connection
// Using mysql2/promise for async/await support

import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'curd_your_enthusiasm',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });

export default pool;

// Example query functions you can use:

/**
 * Get all restaurants with their reviews
 */
export async function getAllRestaurants() {
  const [rows] = await pool.query(`
    SELECT * FROM v_restaurants_full 
    WHERE overall_rating IS NOT NULL 
    ORDER BY visit_date DESC
  `);
  return rows;
}

/**
 * Get a single restaurant by slug
 */
export async function getRestaurantBySlug(slug: string) {
  const [rows] = await pool.query(`
    SELECT 
      r.*,
      n.name as neighborhood_name,
      n.slug as neighborhood_slug,
      c.name as cuisine_name,
      c.slug as cuisine_slug,
      rev.id as review_id,
      rev.food_quality,
      rev.atmosphere,
      rev.service,
      rev.value,
      rev.creativity,
      rev.return_factor,
      rev.overall_rating,
      rev.review_body,
      rev.review_snippet,
      rev.visit_date,
      rev.dishes_tried
    FROM restaurants r
    LEFT JOIN neighborhoods n ON r.neighborhood_id = n.id
    LEFT JOIN cuisines c ON r.cuisine_id = c.id
    LEFT JOIN reviews rev ON r.id = rev.restaurant_id AND rev.published = TRUE
    WHERE r.slug = ?
  `, [slug]);
  
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0];
  }
  return null;
}

/**
 * Get restaurant features/tags
 */
export async function getRestaurantFeatures(restaurantId: number) {
  const [rows] = await pool.query(`
    SELECT f.slug, f.name, f.icon, f.category
    FROM restaurant_features rf
    JOIN features f ON rf.feature_id = f.id
    WHERE rf.restaurant_id = ?
  `, [restaurantId]);
  return rows;
}

/**
 * Get restaurants by neighborhood
 */
export async function getRestaurantsByNeighborhood(neighborhoodSlug: string) {
  const [rows] = await pool.query(`
    SELECT * FROM v_restaurants_full 
    WHERE neighborhood_slug = ? AND overall_rating IS NOT NULL
    ORDER BY overall_rating DESC
  `, [neighborhoodSlug]);
  return rows;
}

/**
 * Get restaurants by cuisine
 */
export async function getRestaurantsByCuisine(cuisineSlug: string) {
  const [rows] = await pool.query(`
    SELECT * FROM v_restaurants_full 
    WHERE cuisine_slug = ? AND overall_rating IS NOT NULL
    ORDER BY overall_rating DESC
  `, [cuisineSlug]);
  return rows;
}

/**
 * Get top rated restaurants
 */
export async function getTopRestaurants(limit: number = 100) {
  const [rows] = await pool.query(`
    SELECT * FROM v_top_restaurants 
    LIMIT ?
  `, [limit]);
  return rows;
}

/**
 * Search restaurants by name, neighborhood, or cuisine
 */
export async function searchRestaurants(searchTerm: string) {
  const [rows] = await pool.query(`
    SELECT * FROM v_restaurants_full 
    WHERE (
      name LIKE ? OR 
      neighborhood_name LIKE ? OR 
      cuisine_name LIKE ?
    )
    AND overall_rating IS NOT NULL
    ORDER BY overall_rating DESC
  `, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
  return rows;
}

/**
 * Get restaurants with a specific feature
 */
export async function getRestaurantsByFeature(featureSlug: string) {
  const [rows] = await pool.query(`
    SELECT DISTINCT r.* FROM v_restaurants_full r
    JOIN restaurant_features rf ON r.id = rf.restaurant_id
    JOIN features f ON rf.feature_id = f.id
    WHERE f.slug = ? AND r.overall_rating IS NOT NULL
    ORDER BY r.overall_rating DESC
  `, [featureSlug]);
  return rows;
}

