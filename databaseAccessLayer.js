const database = require("/databaseConnection");

async function getAllRestaurants() {
  let sqlQuery = `
        SELECT restaurant_id, name, description
        FROM restaurant;
    `;

  try {
    const results = await database.query(sqlQuery);
    console.log("results: ", results[0]);
    return results[0];
  } catch (err) {
    console.log("Error selecting from restaurant table");
    console.log(err);
    return null;
  }
}

const passwordPepper = "SeCretPeppa4MySal+";

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

module.exports = { getAllRestaurants, addRestaurant, deleteRestaurant };
