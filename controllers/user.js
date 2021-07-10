const fs = require("fs").promises;

const QRCode = require("qrcode");
const Jimp = require("jimp");
const QrReader = require("qrcode-reader");

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
      qrcodeUrl: "Some url",
    });
    const result = await user.save();
    res.status(201).json({ message: "User created!", userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const buffer = await fs.readFile(__dirname + "/taibu haroub.png");
    // console.log("Image read successfully");
    // console.log(buffer);
    // const result = await Jimp.read(buffer);
    // console.log(result);

    // Parse the image using Jimp.read() method
Jimp.read(buffer, function(err, image) {
	if (err) {
		console.error(err);
	}
	// Creating an instance of qrcode-reader module
	let qrcode = new QrReader();
	qrcode.callback = function(err, value) {
		if (err) {
			console.error(err);
		}
		// Printing the decrypted value
		console.log(value.result);
	};
	// Decoding the QR code
	qrcode.decode(image.bitmap);
});
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
