document.addEventListener("DOMContentLoaded", () => {
    // Todo Widget Elements
    const inputField = document.getElementById("todo-input");
    const addButton = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const closeWidgetButton = document.getElementById("close-widget");
    const todoWidget = document.getElementById("todo-widget");
    const widgetHeader = document.querySelector(".widget-header");
  
    // Pomodoro Widget Elements
    const pomodoroWidget = document.getElementById("pomodoro-widget");
    const pomodoroStartButton = document.getElementById("pomodoro-start");
    const pomodoroResetButton = document.getElementById("pomodoro-reset");
    const pomodoroDisplay = document.getElementById("pomodoro-display");
  
    let pomodoroInterval;
    let isWorkSession = true; // Toggle between work and break sessions
    let timeLeft = 25 * 60; // Default work duration: 25 minutes
  
    // Add Task Functionality
    addButton.addEventListener("click", () => {
      const task = inputField.value.trim();
      if (task === "") {
        alert("Please enter a task.");
        return;
      }
      addTask(task);
      inputField.value = "";
    });
  
    function addTask(task) {
      const listItem = document.createElement("li");
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          hideAndRemoveTask(listItem);
        }
      });
  
      const taskText = document.createElement("span");
      taskText.textContent = task;
  
      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-btn");
      deleteButton.addEventListener("click", () => {
        hideAndRemoveTask(listItem);
      });
  
      listItem.appendChild(checkbox);
      listItem.appendChild(taskText);
      listItem.appendChild(deleteButton);
      todoList.appendChild(listItem);
    }
  
    function hideAndRemoveTask(taskElement) {
      taskElement.classList.add("hide");
      setTimeout(() => {
        todoList.removeChild(taskElement);
      }, 400);
    }
  
    closeWidgetButton.addEventListener("click", () => {
      todoWidget.style.display = "none";
    });
  
    // Draggable Todo Widget
    let isDragging = false;
    let offsetX, offsetY;
  
    widgetHeader.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - todoWidget.offsetLeft;
      offsetY = e.clientY - todoWidget.offsetTop;
      document.body.style.cursor = "grabbing"; // Change cursor to grabbing
    });
  
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        todoWidget.style.left = `${e.clientX - offsetX}px`;
        todoWidget.style.top = `${e.clientY - offsetY}px`;
      }
    });
  
    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.cursor = "default";
    });
  
    // Draggable Pomodoro Widget
    let timerDrag = false;
    let timerOffsetX, timerOffsetY;
  
    widgetHeader.addEventListener("mousedown", (e) => {
      timerDrag = true;
      timerOffsetX = e.clientX - todoWidget.offsetLeft;
      timerOffsetY = e.clientY - todoWidget.offsetTop;
      document.body.style.cursor = "grabbing"; // Change cursor to grabbing
    });
  
    document.addEventListener("mousemove", (e) => {
      if (timerDrag) {
        todoWidget.style.left = `${e.clientX - timerOffsetX}px`;
        todoWidget.style.top = `${e.clientY - timerOffsetY}px`;
      }
    });
  
    document.addEventListener("mouseup", () => {
      timerDrag = false;
      document.body.style.cursor = "default";
    });
  
  });



// Pomodoro Timer Logic
let timerInterval;
let timeRemaining = 25 * 60; // 25 minutes in seconds
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timeRemaining);
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        alert('Time is up! Take a break.');
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeRemaining = 25 * 60;
  updateTimerDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize Timer Display
updateTimerDisplay();
