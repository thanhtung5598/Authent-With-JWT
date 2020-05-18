require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

mongoose.connect(process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => console.log("server 3000 listening ...."));
