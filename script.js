const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const error = document.getElementById("error");

const taskCount = document.getElementById("taskCount");

const clearBtn = document.getElementById("clearBtn");

const emptyMessage = document.getElementById("emptyMessage");


// Tasks ko localStorage se load karna
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Tasks save karna
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Tasks screen par show karna
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        // Checkbox click
        checkbox.addEventListener("change", function() {

            tasks[index].completed = checkbox.checked;

            saveTasks();

            displayTasks();

        });


        // Task text
        const text = document.createElement("span");

        text.className = "task-text";

        text.innerText = task.text;


        // Delete button
        const deleteBtn = document.createElement("button");

        deleteBtn.innerText = "Delete";

        deleteBtn.className = "delete-btn";


        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();

        });


        li.appendChild(checkbox);

        li.appendChild(text);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });


    updateTaskCount();

}


// Task count
function updateTaskCount() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;


    taskCount.innerText =
        `${total} Tasks • ${completed} Completed`;


    if (tasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

}


// Add task
function addTask() {

    const taskText = taskInput.value.trim();


    if (taskText === "") {

        error.innerText = "Please enter a task.";

        return;

    }


    const newTask = {

        text: taskText,

        completed: false

    };


    tasks.push(newTask);


    saveTasks();


    taskInput.value = "";

    error.innerText = "";


    displayTasks();

}


// Add button
addBtn.addEventListener(
    "click",
    addTask
);


// Enter key
taskInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// Clear all
clearBtn.addEventListener(
    "click",
    function() {

        if (tasks.length === 0) {
            return;
        }


        const confirmDelete =
            confirm("Are you sure you want to delete all tasks?");


        if (confirmDelete) {

            tasks = [];

            saveTasks();

            displayTasks();

        }

    }
);


// App start
displayTasks();