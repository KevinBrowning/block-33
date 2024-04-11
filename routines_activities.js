const client = require("./client")

const createRoutines_Activities = async (is_public, routine_id, activity_id, count) => {
  try{
    const result = await client.query(`
    INSERT INTO routines_activities 
    (is_public, routine_id, activity_id, count)
    VALUES
    (${is_public}, ${routine_id}, ${activity_id}, ${count})
    RETURNING *;
    `);
    return result;
  } catch(error){
    console.log(error)
  }
};

module.exports = createRoutines_Activities;