document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("todo-input");
    const addButton = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const closeWidgetButton = document.getElementById("close-widget");
    const todoWidget = document.getElementById("todo-widget");
    const widgetHeader = document.querySelector(".widget-header");
  
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
  });
  