import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../../../designs/css/main.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.body.token); // Stock le token

        const axiosUserProfile = async () => {
          const anotherResponse = await axios.post(
            "http://localhost:3001/api/v1/user/profile",
            {},
            {
              headers: {
                Authorization: `Bearer ${data.body.token}`, // Ajoute du token (obligatoire)
              },
            }
          );
          const userProfile = anotherResponse.data;
          dispatch({ type: "SET_USER", payload: userProfile.body });
        };
        axiosUserProfile();

        navigate("/user"); // Redirige vers le composant User.jsx
      } else {
        console.error("Erreur de connexion");
      }
    } catch (error) {
      console.error(`Erreur lors de la connexion: ${error.response.data}`);
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={handleEmailChange}
              value={email}
              placeholder="Votre email"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Mot de passe"
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <Link to="/user" onClick={handleLogin} className="sign-in-button">
            Sign In
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Login;
