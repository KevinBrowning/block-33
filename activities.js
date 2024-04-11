const client = require('./client.js');

const createActivity = async (name, description) => {
  try{
    const result = await client.query(`
    INSERT INTO activities (name, description)
    VALUES ('${name}', '${description}')
    RETURNING *;
    `)
    return result;
  } catch(error){
    console.log(error);
  }
};

const getActivities = async () => {
  try{
    const activities = await client.query(`
    SELECT * FROM activities
    `);
    console.log(activities.rows)
    return activities.rows;
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  createActivity,
  getActivities
}