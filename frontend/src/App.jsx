import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import ViewPost from "./pages/ViewPost";
import AuthPage from "./pages/AuthPage";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInAtom } from "./recoil/atoms";
import HomePage from "./pages/HomePage";
import { ToastContainer } from 'react-toastify';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <nav className="bg-white shadow-md p-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <Link to={"/"} className="text-2xl font-extrabold text-blue-700">
          Your Blogs
        </Link>
        <div className="space-x-4 text-sm font-medium">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/create"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Create Post
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-blue-600 hover:underline transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
          <ToastContainer position="top-center" autoClose={3000} />
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:slug" element={<EditPost />} />
          <Route path="/post/:slug" element={<ViewPost />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
