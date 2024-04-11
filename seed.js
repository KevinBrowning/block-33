const client = require('./client.js');
const { createRoutine } = require('./routines.js');
const { createActivity } = require('./activities.js');
const createRoutines_Activities = require('./routines_activities.js');

const syncAndSeed = async () => {
  await client.connect();
  console.log(`CONNECTED TO FITNESS TRACKR`);

  await dropTables();
  console.log(`TABLES DROPPED`)

  await createTables();
  console.log(`TABLES CREATED`)

  await createRoutine('legs', true, 'leg day');
  await createRoutine('push', true, 'push day');
  await createRoutine('fullbody', true, 'full body day');

  await createActivity('squat', 'squat your bodyweight');
  await createActivity('pushup', 'pushup your bodyweight');
  await createActivity('crunch', 'crunch your bodyweight');

  await createRoutines_Activities(true, 1, 1, 10);
  await createRoutines_Activities(true, 2, 2, 10);
  await createRoutines_Activities(true, 3, 1, 10);
  await createRoutines_Activities(true, 3, 2, 10);
  await createRoutines_Activities(true, 3, 3, 10);

  await client.end();
  console.log(`DISCONNECTED TO FITNESS TRACKR`);
};

syncAndSeed();

const dropTables = async () => {
  try{
    await client.query(`
    DROP TABLE IF EXISTS routines_activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS activities;
    `);
  } catch (error){
    console.log(error)
  }
}

const createTables = async () => {
  try{
    await client.query(`
    CREATE TABLE routines (
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      is_public BOOLEAN,
      goal VARCHAR(255)
    );
    CREATE TABLE activities (
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      description VARCHAR(255)
    );
    CREATE TABLE routines_activities (
      id SERIAL PRIMARY KEY,
      is_public BOOLEAN,
      routine_id INT REFERENCES routines(id),
      activity_id INT REFERENCES activities(id),
      count INT
    );
    `);
  } catch (error){
    console.log(error)
  }
}