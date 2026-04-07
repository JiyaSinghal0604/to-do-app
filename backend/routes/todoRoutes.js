const express = require("express");
const router = express.Router();     //lets us create modular routes
const Todo = require("../models/Todo");     //Import the model to use DB

// CREATE
router.post("/", async (req, res) => {   //POST → used to create data / → base route → /api/todos
  try {
    const todo = new Todo({ text: req.body.text });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


//UPDATE||PUT
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,        // id from URL
      req.body,             // new data from client
      { new: true }         // return updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;