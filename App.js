// Import Bootstrap CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Import necessary components and utilities from React Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import custom components for the app's layout and functionality
import NavigationBar from './components/NavigationBar'; // Top navigation bar
import Header from './components/header'; // Header of the page (not currently used)
import Footer from './components/footer'; // Footer of the page
import Content from './components/content'; // Default/main content for the homepage
import Read from './components/read'; // Component for displaying a list of items
import Create from './components/create'; // Component for creating a new item
import Edit from './components/edit'; // Component for editing an existing item

function App() {
  return (
    <Router> {/* Wrap the application with the Router to enable routing */}
      <NavigationBar /> {/* Include the navigation bar at the top */}
      <Routes> {/* Define the application's routes */}
        <Route path="/" element={<Content />} /> {/* Route for the homepage */}
        <Route path="/read" element={<Read />} /> {/* Route for displaying items */}
        <Route path="/create" element={<Create />} /> {/* Route for creating a new item */}
        <Route path="/edit/:id" element={<Edit />} /> {/* Route for editing an item by ID */}
      </Routes>
      <Footer /> {/* Include the footer at the bottom */}
    </Router>
  );
}

export default App; // Export the App component as the default export

