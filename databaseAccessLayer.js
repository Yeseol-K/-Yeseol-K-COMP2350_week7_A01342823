const database = include("/databaseConnection");

async function getRestaurants() {
  let sqlQuery = `
        SELECT restaurant_id, name, description
        FROM restaurant;
    `;

  try {
    const results = await database.query(sqlQuery);
    console.log("results: ", results[0]);
    return results[0];
  } catch (err) {
    console.log("Cannot select restaurant table");
    console.log(err);
    return null;
  }
}

async function addRestaurant(postData) {
  console.log("postData: ", postData);

  let sqlInsertRestaurant = `
        INSERT INTO restaurant (name, description)
        VALUES (:name, :description);
    `;

  let params = {
    name: postData.name,
    description: postData.description,
  };

  console.log(sqlInsertRestaurant);

  try {
    const results = await database.query(sqlInsertRestaurant, params);
    let insertedID = results.insertId;

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteRestaurant(restaurantId) {
  let sqlDeleteRestaurant = `
        DELETE FROM restaurant
        WHERE restaurant_id = :restaurantID
    `;
  let params = {
    restaurantID: restaurantId,
  };
  console.log(sqlDeleteRestaurant);
  try {
    await database.query(sqlDeleteRestaurant, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getReviewRestaurant(restaurantId) {
  let sqlQuery = `
  SELECT review_id, reviewer_name, details, rating
  FROM review
  WHERE restaurant_id = :restaurantId;
`;
  let params = {
    restaurantId: restaurantId,
  };

  try {
    const results = await database.query(sqlQuery, params);
    console.log("results: ", results[0]);
    return results[0];
  } catch (err) {
    console.log("Cannot select restaurant table");
    console.log(err);
    return null;
  }
}

async function getRestaurantById(restaurantId) {
  let sqlQuery = `
    SELECT name
    FROM restaurant
    WHERE restaurant_id = :restaurantId;
  `;

  let params = {
    restaurantId: restaurantId,
  };

  try {
    const results = await database.query(sqlQuery, params);
    return results[0][0];
  } catch (err) {
    console.log("Error selecting restaurant:", err);
    throw err;
  }
}

async function deleteReview(reviewId) {
  let sqlDeleteRestaurant = `
        DELETE FROM review
        WHERE review_id = :reviewId
    `;
  let params = {
    reviewId: reviewId,
  };
  console.log(sqlDeleteRestaurant);
  try {
    await database.query(sqlDeleteRestaurant, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
addReview;

async function addReview(postData) {
  console.log("postData: ", postData);
  let sqlInsertRestaurant = `
        INSERT INTO review ( restaurant_id, reviewer_name, details, rating)
        VALUES (:restaurant_id, :name, :review, :rating);
    `;
  let params = {
    restaurant_id: postData.restaurant_id,
    name: postData.name,
    review: postData.review,
    rating: postData.rating,
  };
  console.log(sqlInsertRestaurant);
  try {
    const results = await database.query(sqlInsertRestaurant, params);
    let insertedID = results.insertId;

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  getRestaurants,
  addRestaurant,
  deleteRestaurant,
  getReviewRestaurant,
  getRestaurantById,
  deleteReview,
  addReview,
};
