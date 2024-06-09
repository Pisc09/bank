// import { useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Features from "../components/Features/Features.jsx";
import Login from "../components/Login/Login.jsx";
import User from "../components/User/User.jsx";
import Footer from "../components/Footer/Footer.jsx";
// import stateReducer from "../reducers/stateReducer.jsx";
function Page() {
  // const [state, dispatch] = useReducer(stateReducer, {});

  // function handleUsernameChange(e) {
  //   dispatch({
  //     type: "ADD_USERNAME",
  //     name: e.target.value,
  //   });
  // }

  // function handlePasswordChange(e) {
  //   dispatch({
  //     type: "ADD_PASSWORD",
  //     password: e.target.value,
  //   });
  // }

  // async function handleClick(e) {}

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Hero />
              <Features />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default Page;
