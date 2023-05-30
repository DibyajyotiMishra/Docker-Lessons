const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_IP,
  MONGODB_PORT,
} = require("./configs/config");
const postRouter = require("./routes/post.routes");
const authRouter = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 8080;

function connectWithRetry() {
  mongoose
    .connect(
      `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_IP}:${MONGODB_PORT}/?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("DB connected!"))
    .catch(e => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
}

connectWithRetry();

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h2>Hi 👋, from Express API within Docker.! </h2>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", authRouter);

app.listen(PORT, () =>
  console.log("Server is up and running on port: " + PORT)
);
