// Get elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Event listener to add task
addTaskButton.addEventListener("click", addTask);

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
    
    saveTasks();
    taskInput.value = ""; // Clear input field
}

// Function to create a task element
function createTaskElement(taskText, completed = false) {
    const li = document.createElement("li");

    if (completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="complete-btn">✔</button>
            <button class="delete-btn">✖</button>
        </div>
    `;

    // Add event listeners to buttons
    li.querySelector(".complete-btn").addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    return li;
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(task => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskItem);
    });
}