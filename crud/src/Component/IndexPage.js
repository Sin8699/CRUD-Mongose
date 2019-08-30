import React, { useEffect } from "react";
import "./Component.css";
import ItemIndexPage from "./ItemIndexPage";
import { socket } from "./../index";
import { connect } from "react-redux";

var IndexPage = props => {
  useEffect(() => {
    socket.emit("GetDataMongo");
    socket.on("GetDataMongoAccess", ({ arr }) => {
      console.log(arr);
      props.dispatch({ type: "SET_DATA_MONGO", arr });
    });
  });

  return (
    <div className="IndexPage">
      <h2>Persons List</h2>
      <table>
        <thead>
          <tr className="title">
            <th>Name</th>
            <th>Company</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <ItemIndexPage />
      </table>
    </div>
  );
};

export default connect()(IndexPage);
