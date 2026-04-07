const mongoose = require("mongoose");       //helps us interact with MongoDB in a structured way

const todoSchema = new mongoose.Schema({    //Schema = structure of data in DB
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);    //Model = tool to interact with DB