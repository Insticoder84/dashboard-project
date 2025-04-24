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

// charts
window.onload = function () {
    // Line chart
    var lineChart = new CanvasJS.Chart("line", {
      animationEnabled: true,
      theme: "dark2",
      title: {
        text: "E-Summit Visitors (2020 - 2025)",
        fontFamily: "Segoe UI",
      },
      axisX: {
        title: "Year",
        interval: 1,
        labelFormatter: function (e) {
          return e.value.getFullYear();
        },
        labelFontColor: "#fff"
      },
      axisY: {
        title: "Number of Visitors",
        includeZero: false,
        labelFontColor: "#fff"
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "line",
          name: "IIT Students",
          showInLegend: true,
          color: "#4F81BC",
          markerType: "circle",
          dataPoints: [
            { x: new Date(2020, 3, 1), y: 1200 },
            { x: new Date(2021, 3, 1), y: 1800 },
            { x: new Date(2022, 3, 1), y: 2500 },
            { x: new Date(2023, 3, 1), y: 3200 },
            { x: new Date(2024, 3, 1), y: 2700 },
            { x: new Date(2025, 3, 1), y: 4500 }
          ]
        },
        {
          type: "line",
          name: "Non-IIT Students",
          showInLegend: true,
          color: "#C0504E",
          markerType: "triangle",
          dataPoints: [
            { x: new Date(2020, 3, 1), y: 800 },
            { x: new Date(2021, 3, 1), y: 1300 },
            { x: new Date(2022, 3, 1), y: 1800 },
            { x: new Date(2023, 3, 1), y: 2100 },
            { x: new Date(2024, 3, 1), y: 2300 },
            { x: new Date(2025, 3, 1), y: 3500 }
          ]
        },
        {
          type: "line",
          name: "Participants",
          showInLegend: true,
          color: "#9BBB59",
          lineDashType: "dash",
          markerType: "square",
          dataPoints: [
            { x: new Date(2020, 3, 1), y: 1800 },
            { x: new Date(2021, 3, 1), y: 2600 },
            { x: new Date(2022, 3, 1), y: 3700 },
            { x: new Date(2023, 3, 1), y: 4500 },
            { x: new Date(2024, 3, 1), y: 5000 },
            { x: new Date(2025, 3, 1), y: 7800 }
          ]
        }
      ]
    });
  
    lineChart.render();
  
    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      lineChart.render();
    }
  
    // Pie chart
    var pieChart = new CanvasJS.Chart("pi", {
      animationEnabled: true,
      theme: "dark2",
      title: {
        text: "E-Summit 2025 Sponsors - IIT Madras"
      },
      legend: {
        cursor: "pointer",
        itemclick: explodeSlice
      },
      toolTip: {
        shared: true,
        content: "<strong>{label}</strong><br>Contribution: {y}%"
      },
      data: [{
        type: "pie",
        startAngle: 240,
        showInLegend: true,
        toolTipContent: "<b>{label}</b>: {y}%",
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 22.5, label: "WestBridge Capital (Title)", color: "#ff7f0e", exploded: true },
          { y: 18.0, label: "Peak XV Partners (Co-Title)", color: "#2ca02c" },
          { y: 14.0, label: "Blume Ventures (Powered By)", color: "#1f77b4" },
          { y: 10.5, label: "Accel (Gold)", color: "#d62728" },
          { y: 10.0, label: "Nexus Venture Partners (Gold)", color: "#d62728" },
          { y: 7.0, label: "Lightspeed India (Silver)", color: "#9467bd" },
          { y: 6.0, label: "Elevation Capital (Silver)", color: "#9467bd" },
          { y: 4.0, label: "AngelList India (Event Partner)", color: "#8c564b" },
          { y: 4.0, label: "CRED (Event Partner)", color: "#8c564b" },
          { y: 4.0, label: "Others", color: "#7f7f7f" }
        ]
      }]
    });
  
    pieChart.render();
  
    function explodeSlice(e) {
      if (typeof (e.dataPoint.exploded) === "undefined" || !e.dataPoint.exploded) {
        e.dataPoint.exploded = true;
      } else {
        e.dataPoint.exploded = false;
      }
      pieChart.render();
    }
  };
// Toggle mobile menu
function toggleMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu.style.display === "block") {
      mobileMenu.style.display = "none"; // Hide the menu
    } else {
      mobileMenu.style.display = "block"; // Show the menu
    }
  }
