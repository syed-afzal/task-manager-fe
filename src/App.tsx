import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header"; // Import the Header component

const App: React.FC = () => {

  // Check if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    setIsAuthenticated(!!authToken); // Set authentication status based on token
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token to log out
    setIsAuthenticated(false); // Update the authentication status
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
          {/* Header Section */}
          <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

          {/* Main Content Section */}
          <div className="w-full max-w-screen-xl mx-auto p-6 flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Private route */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <TaskList />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>

          {/* Footer Section */}
          <footer className="bg-gray-800 text-center text-gray-400 py-4 mt-6">
            <p>© 2025 Task Manager. All Rights Reserved.</p>
          </footer>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
