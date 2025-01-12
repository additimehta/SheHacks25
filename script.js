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
  
    // Pomodoro Timer Functions
    function updatePomodoroDisplay() {
      const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
      const seconds = (timeLeft % 60).toString().padStart(2, "0");
      pomodoroDisplay.textContent = `${minutes}:${seconds}`;
    }
  
    function startPomodoro() {
      if (pomodoroInterval) return; // Prevent multiple intervals
      pomodoroInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updatePomodoroDisplay();
        } else {
          clearInterval(pomodoroInterval);
          pomodoroInterval = null;
          isWorkSession = !isWorkSession; // Toggle session
          timeLeft = isWorkSession ? 25 * 60 : 5 * 60; // 25 min work, 5 min break
          alert(isWorkSession ? "Work session complete! Time for a break." : "Break over! Time to work.");
          updatePomodoroDisplay();
        }
      }, 1000);
    }
  
    function resetPomodoro() {
      clearInterval(pomodoroInterval);
      pomodoroInterval = null;
      isWorkSession = true;
      timeLeft = 25 * 60; // Reset to work duration
      updatePomodoroDisplay();
    }
  
    // Pomodoro Button Event Listeners
    pomodoroStartButton.addEventListener("click", startPomodoro);
    pomodoroResetButton.addEventListener("click", resetPomodoro);
  
    // Initialize Pomodoro Display
    updatePomodoroDisplay();
  });
  