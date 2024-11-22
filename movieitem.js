// Import useEffect from React for handling side effects
import { useEffect } from "react";

// Import Card component from React Bootstrap for styling
import Card from 'react-bootstrap/Card';

// Import Link from React Router to navigate between routes
import { Link } from 'react-router-dom';

// Define the MovieItem functional component
const MovieItem = (props) => {
  // useEffect is used to log the current movie details to the console
  useEffect(() => {
    console.log("Movie Item:", props.mymovie); // Log the movie data when the component mounts or updates
  }, [props.mymovie]); // Dependency array ensures this effect runs only when "mymovie" prop changes

  // Handle the case where "mymovie" prop is missing or undefined
  if (!props.mymovie) {
    return <div>No movie data available</div>; // Graceful fallback for missing data
  }

  // Render the movie item as a Bootstrap card
  return (
    <div>
      <Card>
        {/* Display the movie's title in the card header */}
        <Card.Header>{props.mymovie.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            {/* Display the movie poster */}
            <img 
              src={props.mymovie.poster} // Poster image URL
              alt={props.mymovie.title} // Alternate text for accessibility
              style={{ width: '100%' }} // Style to make the image responsive
            />
            {/* Display the movie release year */}
            <footer>{props.mymovie.year}</footer>
          </blockquote>
          {/* Add an Edit button linking to the Edit page for the specific movie */}
          <Link to={"/edit/" + props.mymovie._id} className="btn btn-primary">
            Edit
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

// Export the MovieItem component to be used in other parts of the application
export default MovieItem;
