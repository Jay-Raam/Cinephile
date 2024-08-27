const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoURI =
  "mongodb+srv://jauvalue:Tby5VZdwtU9GGaJw@cluster0.pi9vv.mongodb.net/jay?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Middleware to hash passwords before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const User = mongoose.model("user", userSchema);

// movies

const movieSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  plot: { type: String, required: true },
  genres: [{ type: String }],
  runtime: { type: Number, required: true },
  cast: [{ type: String }],
  poster: { type: String, required: true },
  title: { type: String, required: true },
  fullplot: { type: String, required: true },
  languages: [{ type: String }],
  released: { type: Date, required: true },
  directors: [{ type: String }],
  rated: { type: String, required: true },
  awards: {
    wins: { type: Number, default: 0 },
    nominations: { type: Number, default: 0 },
    text: { type: String },
  },
  lastupdated: { type: Date, required: true },
  year: { type: Number, required: true },
  imdb: {
    rating: { type: Number, min: 0, max: 10 },
    votes: { type: Number },
    id: { type: Number },
  },
  countries: [{ type: String }],
  type: { type: String, required: true },
  tomatoes: {
    viewer: {
      rating: { type: Number, min: 0, max: 10 },
      numReviews: { type: Number },
      meter: { type: Number, min: 0, max: 100 },
    },
    fresh: { type: Number },
    critic: {
      rating: { type: Number, min: 0, max: 10 },
      numReviews: { type: Number },
      meter: { type: Number, min: 0, max: 100 },
    },
    rotten: { type: Number },
    lastUpdated: { type: Date },
  },
  num_mflix_comments: { type: Number, default: 0 },
});
const Movies = mongoose.model("movies", movieSchema);

// fave mobies

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  image: { type: String },
});
const FavMovies = mongoose.model("carousel", favoriteSchema);

// Routes

// fav movies
app.get("/movies/favorites", async (req, res) => {
  try {
    const favorites = await FavMovies.find();
    res.status(200).json(favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get movies with pagination
app.get("/movies", async (req, res) => {
  try {
    // Extract query parameters
    const { title, page = 1, limit = 10 } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Search for movies
    const movies = await Movies.find({ title: new RegExp(title, "i") })
      .skip(skip)
      .limit(pageSize);

    // Count total number of movies matching the search
    const totalMovies = await Movies.countDocuments({
      title: new RegExp(title, "i"),
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalMovies / pageSize);

    // Respond with movies and pagination info
    res.status(200).json({
      movies,
      page: pageNumber,
      totalPages,
      totalMovies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to handle user registration
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
});

// Route to handle user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error.message); // Log errors
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// Route to get a user by email
app.get("/users/by-email", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email query parameter is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
