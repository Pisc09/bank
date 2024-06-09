import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../../../designs/css/main.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      console.log(`Connexion réussie : ${response.data}`);
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.body.token); // Stock le token
        console.log(data.body.token);

        // Ici, nouvel appel API
        const axiosUserProfile = async () => {
          const anotherResponse = await axios.post(
            "http://localhost:3001/api/v1/user/profile",
            {}
          );
          const userProfile = anotherResponse.data;
          console.log(userProfile);
        };

        axiosUserProfile();

        navigate("/user"); // Redirige vers le composant User.jsx
        console.log(data);
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
          {/* PLACEHOLDER DUE TO STATIC SITE  */}
          <Link to="/user" onClick={handleLogin} className="sign-in-button">
            Sign In
          </Link>
          {/* SHOULD BE THE BUTTON BELOW */}
          {/* <button className="sign-in-button">Sign In</button> */}
        </form>
      </section>
    </main>
  );
}

export default Login;
