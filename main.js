// main.js
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const currentDate = document.getElementById("currentDate");

// Show current date
const now = new Date();
currentDate.textContent = now.toDateString();

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <span class="task-date">${new Date().toLocaleString()}</span>
    <div class="buttons">
      <button class="edit-btn" onclick="editTask(this)">Edit</button>
      <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
      <button class="save-btn" style="display:none" onclick="saveTask(this)">Save</button>
    </div>
  `;
  li.setAttribute("data-status", "pending");
  taskList.appendChild(li);
  taskInput.value = "";
}

function editTask(button) {
  const li = button.closest("li");
  const span = li.querySelector(".task-text");
  const text = span.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = text;
  input.className = "task-text";
  li.replaceChild(input, span);
  button.style.display = "none";
  li.querySelector(".save-btn").style.display = "inline-block";
}

function saveTask(button) {
  const li = button.closest("li");
  const input = li.querySelector("input.task-text");
  const newSpan = document.createElement("span");
  newSpan.className = "task-text";
  newSpan.textContent = input.value;
  li.replaceChild(newSpan, input);
  button.style.display = "none";
  li.querySelector(".edit-btn").style.display = "inline-block";
}

function deleteTask(button) {
  const li = button.closest("li");
  li.remove();
}

function searchTasks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector(".task-text").textContent.toLowerCase();
    li.style.display = text.includes(query) ? "flex" : "none";
  });
}

function filterTasks() {
  const filter = document.getElementById("filterSelect").value;
  document.querySelectorAll("#taskList li").forEach(li => {
    const isCompleted = li.classList.contains("completed");
    if (filter === "all") {
      li.style.display = "flex";
    } else if (filter === "completed") {
      li.style.display = isCompleted ? "flex" : "none";
    } else if (filter === "pending") {
      li.style.display = !isCompleted ? "flex" : "none";
    }
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}