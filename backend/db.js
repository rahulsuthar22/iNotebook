const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/iNotebook?directConnection=true";
mongoose.set("strictQuery", false);

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, () => {
      console.log("connected to mongoDB");
    })
    // .then(() => {
    // })
    .catch((err) => console.log(err));
};
module.exports = connectToMongo;
