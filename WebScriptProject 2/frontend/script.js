// User Authentication Logic

function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (!email || !password) {
        alert("Please fill out all fields.");
        return; 
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
        alert("User already registered. Please login.");
        window.location.href = "login.html";
        return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Redirecting to login...");
    window.location.href = "login.html";
}

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) { 
        alert("Invalid email or password.");
        return;
    }

    localStorage.setItem("loggedInUser", email);
    alert("Login successful!");
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    window.location.href = "login.html";
}

function checkAuth() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const nav = document.querySelector("nav");

    if (loggedInUser) {
        nav.innerHTML = '<a href="index.html">Home</a><a href="#" onclick="logout()">Logout</a>';
    } else {
        nav.innerHTML = '<a href="index.html">Home</a><a href="login.html">Login</a><a href="register.html">Register</a>';
    }
}

checkAuth();
  
// Original Workout Management Logic
  
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let editIndex = -1;
 
function navigateToLog() {
    document.getElementById("log-form").style.display = "block";
    document.getElementById("workout-log").style.display = "block";
}

function addWorkout() {
    const workout = { 
        date: document.getElementById("date").value,
        type: document.getElementById("type").value,
        duration: document.getElementById("duration").value,
        distance: document.getElementById("distance").value,
        avgSpeed: document.getElementById("avg-speed").value,
        avgHeartRate: document.getElementById("avg-heart-rate").value,
        calories: document.getElementById("calories").value
    };

    if (!workout.date || !workout.type || !workout.duration) {
        alert("Please fill out the required fields (date, type, duration).");
        return;
    }

    if (editIndex === -1) {
        workouts.push(workout);
    } else {
        workouts[editIndex] = workout;
        editIndex = -1;
        document.getElementById("add-button").textContent = "Log Workout";
    }

    localStorage.setItem("workouts", JSON.stringify(workouts));
    displayWorkouts();
    document.getElementById("cardio-log-form").reset();
    navigateToLog();
}

function displayWorkouts() {
    const workoutTable = document.getElementById("workout-table").getElementsByTagName("tbody")[0];
    workoutTable.innerHTML = "";

    workouts.forEach((workout, index) => {
        const row = workoutTable.insertRow();
        row.innerHTML = `
            <td>${workout.date}</td>
            <td>${workout.type}</td>
            <td>${workout.duration}</td>
            <td>${workout.distance || "-"}</td>
            <td>${workout.avgSpeed || "-"}</td>
            <td>${workout.avgHeartRate || "-"}</td>
            <td>${workout.calories || "-"}</td>
            <td>
                <button onclick="editWorkout(${index})">Edit</button>
                <button onclick="deleteWorkout(${index})">Delete</button>
            </td>
        `;
    });
}

function deleteWorkout(index) {
    workouts.splice(index, 1);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    displayWorkouts();
}

function editWorkout(index) {
    const workout = workouts[index];
    document.getElementById("date").value = workout.date;
    document.getElementById("type").value = workout.type;
    document.getElementById("duration").value = workout.duration;
    document.getElementById("distance").value = workout.distance;
    document.getElementById("avg-speed").value = workout.avgSpeed;
    document.getElementById("avg-heart-rate").value = workout.avgHeartRate;
    document.getElementById("calories").value = workout.calories;

    editIndex = index;
    document.getElementById("add-button").textContent = "Save Changes";
    navigateToLog();
}

displayWorkouts();


