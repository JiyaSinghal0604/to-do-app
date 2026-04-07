import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // GET todos
  const getTodos = async () => {
    const res = await fetch("http://localhost:5000/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // POST todo
  const addTodo = async () => {
    await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    setText("");
    getTodos();
  };

  // DELETE todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    });
    getTodos();
  };

  //UPDATE to do
  const updateTodo = async (id) => {
  const newText = prompt("Enter new text");

  if (!newText) return; // prevent empty

  await fetch(`http://localhost:5000/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: newText }),
  });

  getTodos();
};
return (
  <div className="container">
    <h1>Todo App</h1>

    <div className="input-box">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button className="add-btn" onClick={addTodo}>Add</button>
    </div>

    <ul>
      {todos.map((t) => (
        <li key={t._id}>
          <span>{t.text}</span>
          <div>
            <button className="edit-btn" onClick={() => updateTodo(t._id)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteTodo(t._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
getTodos();
};

export default App;