const express = require("express");
const monggose = require("mongoose");
const cors = require("cors");
const todoModel = require("./db/Models/Todo");
const app = express();
app.use(cors());
app.use(express.json());

monggose
  .connect("mongodb://localhost:27017/Todo")
  .then((result) => console.log("connected"));

app.post("/add", (req, res) => {
  const { task } = req.body;
  todoModel
    .create({
      task: task,
    })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
app.get("/get", (req, res) => {
  todoModel
    .find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id);
  todoModel
    .findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  todoModel
    .findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    console.log(task);
    const updatedTodo = await todoModel.findByIdAndUpdate(
      { _id: id },
      { task },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen("3001", () => {
  console.log("server is running");
});
