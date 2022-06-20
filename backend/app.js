const express = require("express");
const app = express();
const router = require("./router");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(8080, () => {
  console.log("Server is running...");
});
