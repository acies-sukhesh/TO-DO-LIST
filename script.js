window.onload = function() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function(task) {
    displayTask(task.text, task.done);
  });
}

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let task = taskInput.value;

  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  displayTask(task, false);
  saveTask(task);
  taskInput.value = "";
}

function displayTask(text, done) {
  let li = document.createElement("li");
  li.textContent = text;

  if (done) {
    li.classList.add("done");
  }

  li.addEventListener("click", function() {
    li.classList.toggle("done");
    updateStorage();
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    li.remove();
    updateStorage();
  });

  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
}

function filterTasks(type, btn) {
  // update active button
  document.querySelectorAll(".filter-btn").forEach(function(b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");

  // filter tasks
  let tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(function(li) {
    if (type === "all") {
      li.style.display = "flex";
    } else if (type === "completed") {
      li.style.display = li.classList.contains("done") ? "flex" : "none";
    } else if (type === "pending") {
      li.style.display = !li.classList.contains("done") ? "flex" : "none";
    }
  });
}

function saveTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: text, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
  let lis = document.querySelectorAll("#taskList li");
  let tasks = [];
  lis.forEach(function(li) {
    tasks.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});
