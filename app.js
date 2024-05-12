const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const db = require("./db/connection.db");
const Handlebars = require("handlebars");

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const app = express();
// handlebars views
// view engine setup
app.engine(
  "handlebars",
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

// import routes
const gigRouter = require("./routes/gigs");

app.use("/api/v1/gigs/", gigRouter);

app.listen(3000, () => {
  console.log(`listening on port 3000`);

  db.authenticate()
    .then(() => console.log("db connected"))
    .catch((err) => console.log("err", err));
});
