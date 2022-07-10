const express = require("express");
const app = express();
const cors = require("cors");

const ALLOWED_ORIGINS = [
  /localhost:3000$/,
  "https://database-1882.herokuapp.com",
];

const corsOptions = {
  credentials: true,
  origin: (origin, cb) => {
    if (origin === undefined || ALLOWED_ORIGINS.filter((allowed) => origin.match(allowed)).length > 0) {
      return cb(null, { origin: ALLOWED_ORIGINS });
    }
    cb(new Error('Not allowed by CORS'));
  },
};

app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 9000;

// syncs the models to the postgres database
const db = require('./models');
db.sequelize.sync({
  // ONLY USE `force: true` when you want to completely overwrite your databases
  // force: true
}).then(() => {
  app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});

app.use('/api', require('./routes'));
