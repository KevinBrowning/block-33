const client = require("./client")

const createRoutines_Activities = async (is_public, routine_id, activity_id, count) => {
  try{
    await client.query(`
    INSERT INTO routines_activities 
    (is_public, routine_id, activity_id, count)
    VALUES
    (${is_public}, ${routine_id}, ${activity_id}, ${count})
    `);
  } catch(error){
    console.log(error)
  }
};

module.exports = createRoutines_Activities;