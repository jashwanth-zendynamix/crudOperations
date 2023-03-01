module.exports = function (mongoose) {
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image: String,
  });

  const userModel = mongoose.model("User", userSchema);
  userModel.createCollection().then(() => {
    console.log("users collection created");
  });

  return userModel;
};
