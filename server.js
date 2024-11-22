const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Handle CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String,
});

const movieModel = mongoose.model('myMovies', movieSchema);

// Routes
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await movieModel.find({});
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
});

app.get('/api/movie/:id', async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error });
  }
});

app.put('/api/movie/:id', async (req, res) => {
  try {
    const movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
});

app.post('/api/movies', async (req, res) => {
  try {
    const { title, year, poster } = req.body;
    const newMovie = new movieModel({ title, year, poster });
    await newMovie.save();
    res.status(201).json({ message: "Movie added!", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Error adding movie", error });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
