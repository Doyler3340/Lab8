// Import React to use JSX and React functionalities
import React from 'react';

// Import useParams to retrieve URL parameters
import { useParams } from 'react-router-dom';

// Import useState for managing state and useEffect for side effects
import { useState, useEffect } from 'react';

// Import axios for making HTTP requests
import axios from 'axios';

// Import useNavigate for programmatic navigation
import { useNavigate } from "react-router-dom";

// Define and export the Edit component
export default function Edit() {
  let { id } = useParams(); // Retrieve the "id" parameter from the route
  const [title, setTitle] = useState(""); // State for the movie title
  const [year, setYear] = useState(""); // State for the movie release year
  const [poster, setPoster] = useState(""); // State for the movie poster URL
  const navigate = useNavigate(); // Hook for navigation

  // Fetch movie data when the component loads or when "id" changes
  useEffect(() => {
    axios.get('http://localhost:4000/api/movie/' + id) // GET request to fetch movie by ID
      .then((response) => {
        // Populate state with fetched data
        setTitle(response.data.title);
        setYear(response.data.year);
        setPoster(response.data.poster);
      })
      .catch((error) => {
        console.log("Error fetching movie data:", error); // Log errors if any
      });
  }, [id]); // Dependency array ensures this runs only when "id" changes

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Validate that all fields are filled
    if (!title || !year || !poster) {
      alert("All fields are required.");
      return;
    }

    // Create an object with the updated movie data
    const updatedMovie = { id, title, year, poster };

    // Send a PUT request to update the movie
    axios.put('http://localhost:4000/api/movie/' + id, updatedMovie)
      .then((res) => {
        console.log(res.data); // Log the response data
        navigate('/read'); // Redirect to the "read" page
      })
      .catch((error) => {
        console.error("Error updating movie:", error); // Log errors if any
      });
  };

  return (
    <div>
      <h2>Edit Movie</h2> {/* Title of the page */}
      <form onSubmit={handleSubmit}> {/* Form for editing movie details */}
        <div className="form-group">
          <label>Movie Title: </label>
          <input 
            type="text" 
            className="form-control" 
            value={title} // Bind input value to "title" state
            onChange={(e) => setTitle(e.target.value)} // Update state on input change
          />
        </div>
        <div className="form-group">
          <label>Release Year: </label>
          <input 
            type="text" 
            className="form-control" 
            value={year} // Bind input value to "year" state
            onChange={(e) => setYear(e.target.value)} // Update state on input change
          />
        </div>
        <div className="form-group">
          <label>Poster URL: </label>
          <input 
            type="text" 
            className="form-control" 
            value={poster} // Bind input value to "poster" state
            onChange={(e) => setPoster(e.target.value)} // Update state on input change
          />
        </div>
        <div className="form-group">
          <input 
            type="submit" 
            value="Edit Movie" 
            className="btn btn-primary" // Button for submitting the form
          />
        </div>
      </form>
    </div>
  );
}
