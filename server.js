const mongoose = require("mongoose");
const db = require("./models/index");
const { app, uploadDir, express } = require("./app");

const userRouter = require("./routes/user.route");

app.use("/user", userRouter);
app.use("/uploads", express.static(uploadDir));

app.listen(process.env.PORT || 8080, () => {
  console.log(`app running on port:${process.env.PORT}`);
});
