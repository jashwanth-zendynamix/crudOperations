const mongoose = require("mongoose");
const db = require("./models/index");
const { app } = require("./app");

const userRouter = require("./routes/user.route");

app.use("/user", userRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`app running on port:${process.env.PORT}`);
});
