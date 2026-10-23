// Allows users to open and close the navigation menu when using a smaller screen.
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const themeToggle = document.querySelector(".theme-toggle");
const contactForm = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formStatus = document.getElementById("form-status");

navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");

    if (navMenu.classList.contains("show")) {
        navToggle.setAttribute("aria-expanded", "true");
    } else {
        navToggle.setAttribute("aria-expanded", "false");
    }
});

// Allows users to close the navigation menu after clicking a link.
navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

// Keeps the selected theme when the user reloads or revisits the page.
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// Displays project information on the page so the content can be updated from one array.
function displayProjects(projects) {
    const projectList = document.getElementById("content-list");

    projects.forEach(function (project) {
        const card = document.createElement("div");
        card.classList.add("project-card");

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        card.appendChild(title);
        card.appendChild(description);
        projectList.appendChild(card);
    });
}

const myProjects = [
    {
        title: "My First Website",
        description: "This is a simple website that I made while learning HTML and CSS."
    },
    {
        title: "To-Do App",
        description: "A small project where I practiced JavaScript and list functions."
    },
    {
        title: "Portfolio Page",
        description: "This page shows my projects and contact information in a clean layout."
    }
];

displayProjects(myProjects);

// Prevents incomplete or incorrectly formatted contact information from being accepted.
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;

    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("message-error").textContent = "";

    nameInput.setAttribute("aria-invalid", "false");
    emailInput.setAttribute("aria-invalid", "false");
    messageInput.setAttribute("aria-invalid", "false");

    if (name.length < 2) {
        document.getElementById("name-error").textContent = "Please enter your full name.";
        nameInput.setAttribute("aria-invalid", "true");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        document.getElementById("email-error").textContent = "Please enter a valid email address.";
        emailInput.setAttribute("aria-invalid", "true");
        isValid = false;
    }

    if (message.length < 10) {
        document.getElementById("message-error").textContent = "Message must be at least 10 characters long.";
        messageInput.setAttribute("aria-invalid", "true");
        isValid = false;
    }

    if (isValid) {
        formStatus.textContent = "Your message has been sent successfully!";
        contactForm.reset();
    } else {
        formStatus.textContent = "Please fix the errors and try again.";
    }
});