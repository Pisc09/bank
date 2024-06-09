import { useEffect, useState } from "react";
import axios from "axios";
import Account from "../Account/Account";
import "../../../../designs/css/main.css";

function User() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  // useDispatch (userName)

  useEffect(() => {
    async function userProfile() {
      try {
        const token = localStorage.getItem("token");
        // console.log(token);
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
        setFirstName(response.data.body.firstName);
        setLastName(response.data.body.lastName);
        setUserName(response.data.body.userName);
      } catch (error) {
        console.error(
          `Erreur lors de la récupération du profil de l'utilisateur: ${error.response.data}`
        );
      }
    }
    userProfile();
  }, []);

  function handleEditClick() {
    setIsEditing(true);
  }

  async function handleSaveClick() {
    setIsEditing(false);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        {
          userName,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour du profil de l'utilisateur: ${error.response.data}`
      );
    }
  }

  function handleCancelClick() {
    setIsEditing(false);
  }

  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstName} {lastName} !
        </h1>
      </div>
      <div className="edit-group">
        {isEditing ? (
          <div className="edit-user">
            <input
              type="text"
              placeholder="User name"
              value={userName}
              onChange={handleUserNameChange}
            />
            <input type="text" name="First name" value={firstName} disabled />
            <input type="text" name="Last name" value={lastName} disabled />
            <button onClick={handleSaveClick} className="edit-button">
              Enregistrer
            </button>
            <button onClick={handleCancelClick} className="edit-button">
              Annuler
            </button>
          </div>
        ) : (
          <button onClick={handleEditClick} className="edit-button">
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <Account
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
          btn="View transactions"
        />
      </section>
      <section className="account">
        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
          btn="View transactions"
        />
      </section>
      <section className="account">
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
          btn="View transactions"
        />
      </section>
    </main>
  );
}
export default User;
