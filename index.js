const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_IP,
  MONGODB_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./configs/config");
const postRouter = require("./routes/post.route");
const authRouter = require("./routes/auth.route");

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB connection
function connectMongoWithRetry() {
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

connectMongoWithRetry();

// Redis Connection
let redisClient = redis.createClient({
  socket: {
    host: REDIS_URL,
    port: REDIS_PORT,
  },
});

function connectRedisWithRetry() {
  redisClient
    .connect()
    .then(() => console.log("Redis Connected!"))
    .catch(e => {
      console.log(e);
      setTimeout(connectRedisWithRetry, 5000);
    });
}

connectRedisWithRetry();

let redisStore = new RedisStore({
  client: redisClient,
});

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60000,
    },
  })
);

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.enable("trust-proxy");

app.get("/api/v1/", (req, res) => {
  console.log("Test 1");
  res.send("<h2>Hi 👋, from an EC2 instance...!!! </h2>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", authRouter);

app.listen(PORT, () =>
  console.log("Server is up and running on port: " + PORT)
);
