// Import required modules
const express = require('express'); // Express framework for building web APIs
const mongoose = require('mongoose'); // Mongoose for interacting with MongoDB
const cors = require('cors'); // CORS middleware for handling cross-origin requests

// Initialize the Express application
const app = express();
const port = 4000; // Define the port the server will listen on

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Handle CORS headers for all incoming requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allowed headers
  next(); // Pass control to the next middleware
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14', {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new topology engine
  })
  .then(() => console.log("MongoDB connected successfully")) // Log successful connection
  .catch((err) => console.error("MongoDB connection error:", err)); // Log connection error

// Define a schema for Movie documents
const movieSchema = new mongoose.Schema({
  title: String, // Movie title
  year: String,  // Release year
  poster: String, // URL for the movie poster
});

// Create a Mongoose model for the "myMovies" collection
const movieModel = mongoose.model('myMovies', movieSchema);

// API Routes

// GET /api/movies: Fetch all movies from the database
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await movieModel.find({}); // Fetch all documents from the collection
    res.status(200).json({ movies }); // Respond with the list of movies
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error }); // Handle errors gracefully
  }
});

// GET /api/movie/:id: Fetch a single movie by its ID
app.get('/api/movie/:id', async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id); // Find the movie by its ID
    if (!movie) return res.status(404).json({ message: "Movie not found" }); // Handle movie not found
    res.json(movie); // Respond with the movie data
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error }); // Handle errors gracefully
  }
});

// PUT /api/movie/:id: Update a movie by its ID
app.put('/api/movie/:id', async (req, res) => {
  try {
    const movie = await movieModel.findByIdAndUpdate(
      req.params.id, // ID of the movie to update
      req.body, // New data for the movie
      { new: true } // Return the updated document
    );
    if (!movie) return res.status(404).json({ message: "Movie not found" }); // Handle movie not found
    res.json(movie); // Respond with the updated movie data
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error }); // Handle errors gracefully
  }
});

// POST /api/movies: Add a new movie to the database
app.post('/api/movies', async (req, res) => {
  try {
    const { title, year, poster } = req.body; // Extract movie data from the request body
    const newMovie = new movieModel({ title, year, poster }); // Create a new movie document
    await newMovie.save(); // Save the movie to the database
    res.status(201).json({ message: "Movie added!", movie: newMovie }); // Respond with success message and new movie data
  } catch (error) {
    res.status(500).json({ message: "Error adding movie", error }); // Handle errors gracefully
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log the server's start and URL
});
