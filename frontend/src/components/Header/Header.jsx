import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "../../../../designs/css/main.css";
import logo from "../../../../designs/img/argentBankLogo.png";

function Header() {
  const { userName } = useSelector((state) => state);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <FontAwesomeIcon icon={faUserCircle} />
        {localStorage.getItem("token") ? (
          <>
            <span className="mx-span">{userName}</span>
            <button
              onClick={handleLogout}
              className="main-nav-item btn-signout"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className="main-nav-item">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
