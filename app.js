const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const Blog = require("./models/blog");
const Comment = require("./models/comment");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const blogRoutes = require("./routes/blog");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(blogRoutes);

Blog.hasMany(Comment);

sequelize
  // .sync({ force: true})
  .sync()
  .then((user) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));