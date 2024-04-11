const client = require('./client.js');

const createRoutine = async (name, is_public, goal) => {
  try{
    await client.query(`
    INSERT INTO routines (name, is_public, goal)
    VALUES ('${name}', ${is_public}, '${goal}');
    `)
  } catch(error){
    console.log(error);
  }
};

const getRoutines = async () => {
  try{
    const routines = await client.query(`
    SELECT * FROM routines
    `);
    console.log(routines.rows)
    return routines.rows;
  } catch(error) {
    console.log(error);
  }
}

module.exports = { 
  createRoutine,
  getRoutines
};