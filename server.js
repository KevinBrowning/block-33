const express = require('express');
const app = express();
const PORT = 8080;
const client = require('./client.js');
const { getActivities } = require('./activities.js');

app.use(express.json());

client.connect();

app.listen(PORT, (req, res) => {
  console.log(`We're live on port ${PORT}`);
})

app.get('/api/v1/activities', async (req, res) => {
  const activities = await getActivities();
  res.json({ activities });
})