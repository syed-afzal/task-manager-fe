// components/Header.tsx
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const handleLogout = () => {
    dispatch(logout());
  };
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-3xl font-bold text-white">Task Manager</h1>

      {isAuthenticated && (
        <button
          onClick={() => {
            handleLogout();
            navigate("/login");
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
