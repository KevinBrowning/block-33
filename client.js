const { Client } = require('pg');
const { listenerCount } = require('pg/lib/client');
const client = new Client('postgres://localhost:5432/fitness_trackr')

module.exports = client;