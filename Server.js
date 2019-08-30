// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const PORT = 1212;
// // const cors = require("cors");

// // const mongoose = require("mongoose");
// // const config = require("config");
// var server = require("http").Server(app);
// var io = require("socket.io")(server);

// // app.use(express.json());

// // const db = config.get("mongoURI");

// // const Persons = require("./models/Persons");

// // mongoose
// //   .connect(db, {
// //     useNewUrlParser: true,
// //     useCreateIndex: true,
// //     useFindAndModify: false
// //   })
// //   .then(() => console.log("MongoDB Connected..."))
// //   .catch(err => console.log(err));
// // app.use(cors());
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());

// io.on("connection", socket => {
//   console.log("USER CONNECTION");

//   socket.emit(
//     "GetData",
//     Persons.find()
//       .sort({ date: -1 })
//       .then(items => res.json(items))
//   );

//   socket.on("disconnect", function() {
//     console.log(socket.id + " ngắt kết nối");
//   });
// });

// app.listen(PORT, () => console.log("Server is running on Port:", PORT));

// // // Read all entries
// // app.get("/", (req, res) => {
// //   Persons.find()
// //     .sort({ date: -1 })
// //     .then(items => console.log(res.json(items)));
// // });

// // // Add a new entry
// // app.post("/", (req, res) => {
// //   const newPersons = new Persons({
// //     name: "abc",
// //     company: "",
// //     age: "12"
// //   });
// //   newAnimal.save().then(item => res.json(item));
// // });

// // // Delete an entry
// // app.delete("/:id", (req, res) => {
// //   Persons.findOneAndDelete({ _id: req.params.id })
// //     .then(() => res.json({ success: true }))
// //     .catch(err => res.sta  tus(404).json({ success: false }));
// // });

// // // Update an entry
// // app.put("/:id", (req, res) => {
// //   Persons.findOneAndUpdate({ _id: req.params.id }, req.body)
// //     .then(() => res.json({ success: true }))
// //     .catch(err => res.status(404).json({ success: false }));
// // });

var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const Persons = require("./models/Persons");
var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(1212);
app.use(express.json());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

io.on("connection", socket => {
  console.log("USER CONNECTION");

  socket.on("GetDataMongo", () => {
    Persons.find({}, (err, arr) => {
      socket.emit("GetDataMongoAccess", { arr });
    });
  });

  socket.on("AddDataMongo", data => {
    const newPersons = new Persons(data);
    newPersons
      .save()
      .then(item => console.log("add : " + item))
      .catch(err => console.log(err));
    Persons.find({}, (err, arr) => {
      socket.emit("GetDataMongoAccess", { arr });
    });
  });

  socket.on("DeleteDataMongo", _id => {
    Persons.findOneAndDelete({ _id }).then("delete : " + console.log(_id));
    Persons.find({}, (err, arr) => {
      socket.emit("GetDataMongoAccess", { arr });
    });
  });

  socket.on("UpdateDataMongo", _id => {
    Persons.findOneAndUpdate({ _id }, { name: "123" }).then(item =>
      console.log("Update : " + item)
    );
    Persons.find({}, (err, arr) => {
      socket.emit("GetDataMongoAccess", { arr });
    });
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " ngắt kết nối");
  });
});
