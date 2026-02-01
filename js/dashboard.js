const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) window.location.href = "index.html";

userName.innerText = user.name;
userRole.innerText = user.role;

// Jam realtime
setInterval(() => {
  dateTime.innerText = new Date().toLocaleString("id-ID");
}, 1000);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all"; 

function priorityBadge(p) {
  if (p === "Tinggi") return "bg-red-100 text-red-700";
  if (p === "Sedang") return "bg-yellow-100 text-yellow-700";
  return "bg-gray-200 taext-gray-700";
}

function setFilter(type) {
  currentFilter = type;

  document.querySelectorAll(".filter-card")
    .forEach(el => el.classList.remove("ring-2", "ring-blue-400"));

  document.getElementById("filter-" + type)
    ?.classList.add("ring-2", "ring-blue-400");

  render();
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

function addTask() {
  if (!taskTitle.value) return alert("Isi tugas");

  tasks.push({
    id: Date.now(),
    title: taskTitle.value,
    date: taskDate.value,
    priority: taskPriority.value,
    done: false
  });

  taskTitle.value = "";
  save();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return alert("Task tidak ditemukan");
  task.done = !task.done;
  save();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
}

function clearAll() {
  if (confirm("Yakin hapus semua tugas?")) {
    tasks = [];
    save();
  }
}

function render() {
  taskList.innerHTML = "";

  let filteredTasks = [...tasks];

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(t => !t.done);
  }
  else if (currentFilter === "done") {
    filteredTasks = tasks.filter(t => t.done);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <p class="text-gray-500 text-center">
        Tidak ada tugas untuk filter ini.
      </p>`;
  }

  filteredTasks.forEach(t => {
    taskList.innerHTML += `
      <div class="border p-4 rounded-lg mb-3 
                  flex flex-col md:flex-row 
                  md:justify-between md:items-center gap-3">

        <div>
          <p class="font-medium ${t.done ? 'line-through text-gray-400' : ''}">
            ${t.title}
          </p>
          <div class="text-sm text-gray-500">
            ${t.date || ''}
            <span class="ml-2 px-2 py-1 rounded ${priorityBadge(t.priority)}">
              ${t.priority}
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2">
          <button onclick="toggleTask(${t.id})"
            class="bg-green-500 text-white px-3 py-2 rounded">
            ${t.done ? "Undo" : "Done"}
          </button>
          <button onclick="deleteTask(${t.id})"
            class="bg-red-500 text-white px-3 py-2 rounded">
            Hapus
          </button>
        </div>
      </div>
    `;
  });

  totalTask.innerText = tasks.length;
  activeTask.innerText = tasks.filter(t => !t.done).length;
  doneTask.innerText = tasks.filter(t => t.done).length;
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

render();
