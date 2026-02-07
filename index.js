const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./src/routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hrg-heroes';

mongoose.connect(MONGO)
  .then(() => console.log('Mongo connected'))
  .catch(err => {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
