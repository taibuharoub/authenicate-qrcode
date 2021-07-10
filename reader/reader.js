const fs = require("fs");

const QrCode = require("qrcode-reader");
const Jimp = require("jimp");

const qr = new QrCode();
qr.callback = function (error, result) {
  if (error) {
    console.log(error);
    return;
  }
  console.log(result);
};

var buffer = fs.readFileSync(__dirname + "/image.png");
Jimp.read(buffer, function (err, image) {
  if (err) {
    console.error(err);
    // TODO handle error
  }
  var qr = new QrCode();
  qr.callback = function (err, value) {
    if (err) {
      console.error(err);
      // TODO handle error
    }
    console.log(value);
    // console.log(value.result);
    // console.log(value);
  };
  qr.decode(image.bitmap);
});
