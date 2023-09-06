import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="container bg-zinc-700 my-3 flex justify-between py-5 px-5 sm:px-10 rounded-lg items-center">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold">Task Manager</h1>
        {isAuthenticated ? <h3> Welcome {user.username} </h3> : ""}
      </Link>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {isAuthenticated ? (
          <>
            <li>
              <Link
                to="/new-task"
                className="bg-indigo-500 hover:bg-indigo-700 px-2 py-1 sm:px-4 rounded-sm"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => logout()}
                className="bg-red-700 hover:bg-red-800 px-2 py-1 sm:px-4 rounded-sm"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
