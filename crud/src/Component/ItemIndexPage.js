import React from "react";
import "./Component.css";
import { socket } from "..";
import { connect } from "react-redux";

var ItemIndexPage = props => {
  return (
    <tbody>
      {props.arrData.map((x, index) => (
        <tr className="ItemIndexPage" key={index}>
          <th>{x.name}</th>
          <th>{x.company}</th>
          <th>{x.age}</th>
          <th>
            <button
              className="edit"
              onClick={() => {
                socket.emit("UpdateDataMongo", x._id);
              }}
            >
              Edit
            </button>
            <button
              className="del"
              onClick={() => {
                socket.emit("DeleteDataMongo", x._id);
              }}
            >
              Delete
            </button>
          </th>
        </tr>
      ))}
    </tbody>
  );
};
var mapStateToProps = state => {
  return {
    arrData: state.arrData
  };
};
export default connect(mapStateToProps)(ItemIndexPage);
