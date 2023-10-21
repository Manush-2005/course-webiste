const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SERCET_KEY = "zobime660";
const cors = require("cors");

const app = express();
app.use(cors());

const port = 3000;
app.use(express.json());

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Courseschema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imagelink: String,
  published: Boolean,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  publishedcourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});
const users = mongoose.model("User", UserSchema);
const Admin = mongoose.model("Admin", AdminSchema);
const Course = mongoose.model("Course", Courseschema);

const authencitatejwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Admin routes
app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;

  const isuser = await Admin.findOne({ username });

  if (isuser) {
    res.status(400).json({ message: "User already exists" });
  } else {
    const newUser = new Admin({ username, password });
    await newUser.save();
    const token = jwt.sign({ username }, SERCET_KEY, { expiresIn: "1h" });
    res.status(200).json({ message: "User created", token });
  }
});

app.post("/admin/signin", (req, res) => {
  const { username, password } = req.body;
  const isuser = Admin.findOne({ username, password });

  if (isuser) {
    const token = jwt.sign({ username }, SERCET_KEY, { expiresIn: "1h" });
    res.status(200).json({ message: "Logged in successfully", token });
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

app.post("/admin/createcourse", async (req, res) => {
  const newcourse = new Course(req.body);
  await newcourse.save();
  res
    .status(200)
    .json({ message: "Course created successfully", courseid: newcourse._id });
});

app.get("/admin/course:id", async (req, res) => {
  const reqcourse = await Course.findOne({ _id: req.params.id });
  res.status(200).json({ reqcourse });
});

app.put("/admin/course:id", async (req, res) => {
  const updatecourse = await Course.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  if (updatecourse) {
    res.status(200).json({ message: "Course updated successfully" });
  } else {
    res.status(400).json({ message: "Course not found" });
  }
});
app.get("/admin/courses", authencitatejwt, async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

//User routes

app.post("/users/signup", async (req, res) => {
  const { username, password } = req.body;

  const isuser = await users.findOne({ username });

  if (isuser) {
    res.status(400).json({ message: "User already exists" });
  } else {
    const newUser = new users({ username, password });
    await newUser.save();
    const token = jwt.sign({ username }, SERCET_KEY, { expiresIn: "1h" });
    res.status(200).json({ message: "User created", token });
  }
});

app.post("/users/signin", (req, res) => {
  const { username, password } = req.body;
  const isuser = users.findOne({ username, password });

  if (isuser) {
    const token = jwt.sign({ username }, SERCET_KEY, { expiresIn: "1h" });
    res.status(200).json({ message: "Logged in successfully", token });
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

app.get("/users/courses", async (req, res) => {
  const courses = await Course.find({ published: true });
  res.status(200).json({ courses });
});

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://zobime660:9RcVH9Sy0v6YExz1@cluster0.dxrqqdn.mongodb.net/login?retryWrites=true&w=majority"
    )
    .then(console.log("connected to database"));
  console.log("It is working");
});
