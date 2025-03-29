import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ onLogout }) => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Typing Test</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/sessions">My Sessions</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={onLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
