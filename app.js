const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect("mongodb://localhost:27017/qrcode", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server Started at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
