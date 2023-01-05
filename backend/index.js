const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const app = express();

connectToMongo();

const port = 5000;
app.use(cors());
// This is the middleware for req, res
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`);
});
