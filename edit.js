
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Edit() {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/movie/' + id)
      .then((response) => {
        setTitle(response.data.title);
        setYear(response.data.year);
        setPoster(response.data.poster);
      })
      .catch((error) => {
        console.log("Error fetching movie data:", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !year || !poster) {
      alert("All fields are required.");
      return;
    }

    const updatedMovie = { id, title, year, poster };

    axios.put('http://localhost:4000/api/movie/' + id, updatedMovie)
      .then((res) => {
        console.log(res.data);
        navigate('/read');
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
      });
  };

  return (
    <div>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Movie Title: </label>
          <input 
            type="text" 
            className="form-control" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Release Year: </label>
          <input 
            type="text" 
            className="form-control" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Poster URL: </label>
          <input 
            type="text" 
            className="form-control" 
            value={poster} 
            onChange={(e) => setPoster(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Movie" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
