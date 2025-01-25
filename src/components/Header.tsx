// components/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-3xl font-bold text-white">Task Manager</h1>

      {/* Logout Button */}
      {isAuthenticated && (
        <button
          onClick={() => {
            handleLogout();
            navigate("/login"); // Redirect after logout
          }}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
