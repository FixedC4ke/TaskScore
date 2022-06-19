const express = require("express");
const app = express();
const router = require('./router');

app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(8080, () => {
  console.log("Server is running...");
});
