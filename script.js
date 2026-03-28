
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

// Save data
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Change filter
function setFilter(type) {
  filter = type;
  renderTasks();
}

// Add task
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (!text) return;

  tasks.push({
    text,
    completed: false,
    time: new Date().toLocaleString()
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

// Render tasks
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    // Top section
    const top = document.createElement("div");
    top.className = "task-top";

    // Text
    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    text.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    // Actions
    const actions = document.createElement("div");
    actions.className = "actions";

    // Edit
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks();
      }
    };

    // Delete
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    top.appendChild(text);
    top.appendChild(actions);

    // Time
    const time = document.createElement("div");
    time.className = "task-time";
    time.textContent = task.time;

    li.appendChild(top);
    li.appendChild(time);

    list.appendChild(li);
  });
}

renderTasks();