import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const MovieItem = (props) => {
  useEffect(() => {
    console.log("Movie Item:", props.mymovie);
  }, [props.mymovie]); // Run this effect only when the mymovie prop changes

  if (!props.mymovie) {
    return <div>No movie data available</div>; // Handle missing props gracefully
  }

  return (
    <div>
      <Card>
        <Card.Header>{props.mymovie.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.mymovie.poster} alt={props.mymovie.title} style={{ width: '100%' }} />
            <footer>{props.mymovie.year}</footer>
          </blockquote>
          {/* Include the Link inside the JSX */}
          <Link to={"/edit/" + props.mymovie._id} className="btn btn-primary">
            Edit
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieItem;
