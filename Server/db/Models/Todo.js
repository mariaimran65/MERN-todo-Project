const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: String,
  done: {
    type: Boolean,
    default: false,
  },
  searched: {
    type: Boolean,
    default: false,
  },
});

const todoModel = mongoose.model("todo", todoSchema);
module.exports = todoModel;
