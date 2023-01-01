const connectToMongo = require("./db");
const express = require("express");
connectToMongo();

const app = express();
const port = 5000;
// This is the middleware for req, res
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`);
});
