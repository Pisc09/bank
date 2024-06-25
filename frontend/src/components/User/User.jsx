import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Account from "../Account/Account";
import "../../../../designs/css/main.css";

function User() {
  const dispatch = useDispatch();
  const { firstName, lastName, userName, isEditing } = useSelector(
    (state) => state
  );
  const [newUserName, setNewUserName] = useState(userName);

  function handleEditClick() {
    dispatch({ type: "SAVE_USER" });
    dispatch({ type: "SET_EDITING", payload: true });
  }

  async function handleSaveClick() {
    dispatch({ type: "SET_EDITING", payload: false });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        {
          userName: newUserName,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch({ type: "SET_user", payload: newUserName });
      }
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour du profil de l'utilisateur: ${error.response.data}`
      );
    }
  }

  function handleCancelClick() {
    dispatch({ type: "SET_EDITING", payload: false });
    dispatch({ type: "RESET_USER" });
  }

  function handleUserNameChange(e) {
    const value = e.target.value;
    setNewUserName(value);
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
              value={newUserName}
              onChange={(e) => handleUserNameChange(e)}
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
