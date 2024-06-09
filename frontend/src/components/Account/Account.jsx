import "../../../../designs/css/main.css";

function Account({ title, amount, description, btn }) {
  return (
    <>
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">{btn}</button>
      </div>
    </>
  );
}

export default Account;
