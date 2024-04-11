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

module.exports = createRoutine;