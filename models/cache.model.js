module.exports = function (mongoose) {
  const cacheSchema = new mongoose.Schema(
    {
      _id: String,
      dateTime: { type: Date, default: Date.now },
    },
    {
      timeseries: {
        timeField: "dateTime",
        granularity: "seconds",
      },
      expireAfterSeconds: 10,
    }
  );

  const cacheModel = new mongoose.model("cache", cacheSchema);
  cacheModel.createCollection().then(() => {
    console.log("cache collection created");
  });

  // mongoose.test.runCommand({
  //   collMod: "cache",
  //   expireAfterSeconds: 10,
  // });
  return cacheModel;
};
