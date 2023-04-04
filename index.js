const express = require("express");
const { connection } = require("./Config/db");
const { userRouter } = require("./routes/user.route");
const { Authenticate } = require("./middleware/Authenticate.middleware");
const { getProfile } = require("./routes/getProfile.route");
const cors = require("cors")
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});


app.use("/user",userRouter)
// app.use(Authenticate)
app.use("/getProfile", getProfile);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Data-base");
  } catch (err) {
    console.log("Not connected to Data-base");
    console.log(err);
  }

  console.log("Server is running port at 8080");
});
