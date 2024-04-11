const express = require('express');
const app = express();
const PORT = 8080;
const client = require('./client.js');
const { createActivity, getActivities } = require('./activities.js');
const { createRoutine, getRoutines } = require('./routines.js');
const createRoutines_Activities = require('./routines_activities.js');

app.use(express.json());

client.connect();

app.listen(PORT, (req, res) => {
  console.log(`We're live on port ${PORT}`);
});

app.get('/api/v1/activities', async (req, res) => {
  try{
    const activities = await getActivities();
    res.json({ activities });
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/v1/activities/:id', async (req, res) => {
  const { id } = req.params;
  const activities = await getActivities();
  const activity = activities.find(activity => activity.id == id);
  if(activity){
    console.log(activity);
  res.json({ activity });
  }
});

app.post('/api/v1/activities', async (req, res) => {
  const { name, description } = req.body;
  const createdActivity = await createActivity(name, description)
  console.log(createdActivity)
  res.status(201).send(createdActivity);
});

app.get('/api/v1/routines', async (req, res) => {
  const routines = await getRoutines();
  res.json({ routines });
})

app.get('/api/v1/routines/:id', async (req, res) => {
  const { id } = req.params;
  const routines = await getRoutines();
  const routine = routines.find(routine => routine.id == id);
  if(routine){
    console.log(routine);
  res.json({ routine });
  }
});

app.post('/api/v1/routines', async (req, res) => {
  const { name, is_public, goal } = req.body;
  const createdRoutine = await createRoutine(name, is_public, goal)
  console.log(createdRoutine);
  res.status(201).send(createdRoutine);
});

app.post('/api/v1/routines_activities', async (req, res) => {
  const { is_public, routine_id, activity_id, count } = req.body;
  const createdRoutineActivity = await createRoutines_Activities( is_public, routine_id, activity_id, count)
  console.log(createdRoutineActivity);
  res.status(201).send(createdRoutineActivity);
});