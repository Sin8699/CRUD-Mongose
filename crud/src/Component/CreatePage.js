import React from "react";
import "./Component.css";
import { socket } from "./../index";

var CreatePage = () => {
  var name = React.createRef("");
  var company = React.createRef("");
  var age = React.createRef("");
  return (
    <div className="CreatePage">
      <form
        onSubmit={e => {
          e.preventDefault();
          if (
            name.current.value === "" ||
            company.current.value === "" ||
            age.current.value === ""
          )
            return;
          socket.emit("AddDataMongo", {
            name: name.current.value,
            company: company.current.value,
            age: age.current.value
          });
        }}
      >
        <h3>Add New Person</h3>
        <div>
          <p>Person Name:</p>
          <input type="text" ref={name} />
        </div>
        <div>
          <p>Company Name:</p>
          <input type="text" ref={company} />
        </div>
        <div>
          <p>Age</p>
          <input type="number" ref={age} />
        </div>
        <button className="submit" type="submit">
          Register Person
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
