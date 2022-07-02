const express = require("express");
const app = express();
const cors = require("cors");

const whitelist = [
  "http://localhost:3000",
  "https://database-1882.herokuapp.com",
  "http://localhost:5000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// test db is connected

const PORT = process.env.PORT || 9000;

// syncs the models to the postgres database
const db = require('./models');
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});

// app.get('/', (req, res) => res.send('INDEX')); // loads homepage // create index route that catches get request

// Gig routes
// app.use("/gigs", require("./routes/gigs")); // require the gigs route for anything that's '/gigs'
// app.use('/', require('./routes/apiRoutes')); // will uncomment this later after fixing syntax in apiRoutes
// app.use("/all_media_route", require("./routes/all_media_route"));
