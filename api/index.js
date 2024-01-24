const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET_KEY;
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const Place = require("./models/Place.js");
const Booking = require("./models/booking.js");

const bcryptSalt = bcrypt.genSaltSync(10);

const getUserDataFromToken =(req)=>{
  return new Promise ((resolve, reject)=>{
    
  jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
    if(err) throw err;
    resolve(userData)
  });
  })
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// mongodb password:0Dkg8PqdvQIoI6p9

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test Ok");
});

// Registering the User

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

// Logging in the user

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  //   if else for user
  try {
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      // if else for password
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,

          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("password incorrect");
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      const { name, email, id } = await User.findById(userData.id);
      res.json({ name, email, id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".jpg";

  await download.image({ url: link, dest: __dirname + "/uploads/" + newName });
  res.json(newName);
});

const photoUpload = multer({ dest: "uploads/" });

app.post("/upload", photoUpload.array("photos", 100), async (req, res) => {
  const uploadFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    console.log(ext);
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace("uploads\\", ""));
  }
  console.log(req.files);
  res.json(uploadFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;

  const {
    title,
    address,
    addedPhotos,
    discription,
    extraInfo,
    perks,
    checkInTime,
    checkOutTime,
    guest,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const placesDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      addedPhotos,
      discription,
      extraInfo,
      perks,
      checkInTime,
      checkOutTime,
      guest,
      price,
    });
    res.json(placesDoc);
  });
});
app.put("/places", async (req, res) => {
  const { token } = req.cookies;

  const {
    id,
    title,
    address,
    addedPhotos,
    discription,
    extraInfo,
    perks,
    checkInTime,
    checkOutTime,
    guest,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const placeDoc = await Place.findById(id);
    if (userData.id == placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        addedPhotos,
        discription,
        extraInfo,
        perks,
        checkInTime,
        checkOutTime,
        guest,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/user-places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/bookings", async(req, res) => {
  const { checkInDate, checkOutDate, guest, mobile, price,place} = req.body;
  const userData = await  getUserDataFromToken(req)
  Booking.create({
    checkInDate,
    checkOutDate,
    guest,
    mobile,
    price,
    place,
    user: userData.id
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get('/bookings', async(req,res)=>{
    const userData = await getUserDataFromToken(req)
res.json(await Booking.find({ user:userData.id}).populate('place'))

})

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
