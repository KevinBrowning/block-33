const express = require('express');
const app = express();
const PORT = 8080;
const client = require('./client.js');
const { getActivities } = require('./activities.js');
const { getRoutines } = require('./routines.js');

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