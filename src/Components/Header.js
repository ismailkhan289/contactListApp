import React from "react";

const Header = ({ toggleModal, noOfContacts }) => {
  // here we are passing the funcation and paramater
  //of noOfContacts

  return (
    <div>
      <header className="header">
        <div className="container">
          <h3>No Contacts ({noOfContacts})</h3>
          <button onClick={() => toggleModal(true)} className="btn">
            <i className="bi bi-plus-square"></i>Add New Contact
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
