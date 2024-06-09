import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../../../designs/css/main.css";
import logo from "../../../../designs/img/argentBankLogo.png";
// useSelector ici

function Header() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function userNameProfile() {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.post(
          "http://localhost:3001/api/v1/user/profile",
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setUserName(response.data.body.userName);
      } catch (error) {
        console.error(
          `Erreur lors de la récupération du profil de l'utilisateur: ${error.response.data}`
        );
      }
    }
    userNameProfile();
  }, []);

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
