const QRCode = require("qrcode");

const User = require("../models/User");

exports.signUp = async (req, res, next) => {
  const { name, password, email } = req.body;
  if (!name) {
    const error = new Error("Name, password, and email required.");
    error.statusCode = 500;
    throw error;
  }

  try {
    let qrcodeData = JSON.stringify({
      name,
      password,
      email,
    });
    await QRCode.toFile(`${name}.png`, qrcodeData);
    const user = new User({
        name,
        password,
        email,
        qrcodeUrl: "Some url"
    })
    const result = await user.save();
    res.status(201).json({message: 'User created!', userId: result._id})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  console.log(req.body);
};
