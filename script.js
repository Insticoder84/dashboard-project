// to do list
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  const task = {
    text: taskText,
    completed: false
  };

  // Save the new task in localStorage
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  taskInput.value = '';
  renderTasks();
}

function deleteTask(button) {
  const li = button.closest('li');
  const taskText = li.querySelector('span').textContent;
  const tasks = getTasksFromStorage();

  // Remove the task from the array
  const updatedTasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  renderTasks();
}

function toggleComplete(button) {
  const li = button.closest('li');
  const taskText = li.querySelector('span').textContent;
  const tasks = getTasksFromStorage();

  // Toggle completion status of the task
  const updatedTasks = tasks.map(task => {
    if (task.text === taskText) {
      task.completed = !task.completed;
    }
    return task;
  });

  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  renderTasks();
}

function editTask(button) {
  const li = button.closest('li');
  const span = li.querySelector('span');
  const currentText = span.textContent;
  const newText = prompt('Edit task:', currentText);
  if (newText !== null && newText.trim() !== '') {
    const tasks = getTasksFromStorage();

    // Update the task text
    const updatedTasks = tasks.map(task => {
      if (task.text === currentText) {
        task.text = newText.trim();
      }
      return task;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    renderTasks();
  }
}

// Render all tasks
function renderTasks() {
  const tasks = getTasksFromStorage();
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear the list

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);
    li.innerHTML = `
          <span>${task.text}</span>
          <div class="task-actions">
            <button class="complete-btn" onclick="toggleComplete(this)">✔</button>
            <button class="edit-btn" onclick="editTask(this)">✏️</button>
            <button class="delete-btn" onclick="deleteTask(this)">🗑️</button>
          </div>
        `;
    taskList.appendChild(li);
  });
}

// Get tasks from localStorage
function getTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Load tasks when the page is loaded
function loadTasks() {
  renderTasks();
}
