const app = require("express")();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("<h2>Hi 👋, from Express API within Docker...!!! </h2>");
});

app.listen(PORT, () =>
  console.log("Server is up and running on port: " + PORT)
);
