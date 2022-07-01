const express = require("express");
const exphbs = require("express-handlebars"); // express template engine to display html and include dynamic conten
const bodyParser = require("body-parser"); // parses the incoming request bodies in a middleware (function that receives request and response objects) before you handle it
const path = require("path"); // deals with filepaths
const cors = require("cors");

const app = express(); // initialize app

const whitelist = [
  "http://localhost:3000",
  "https://database-1882.herokuapp.com",
  "http://localhost:5000",
]; // add any other urls you want to get data from to this list. allows you to do any extension like/about, in future when deploy
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// database
const db = require("./config/database");

// test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// app.get('/', (req, res) => res.send('INDEX')); // loads homepage // create index route that catches get request

// Gig routes
app.use("/gigs", require("./routes/gigs")); // require the gigs route for anything that's '/gigs'
// app.use('/', require('./routes/apiRoutes')); // will uncomment this later after fixing syntax in apiRoutes
// app.use("/all_media_route", require("./routes/all_media_route"));

const PORT = process.env.Port || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`)); // runs server
