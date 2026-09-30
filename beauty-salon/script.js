/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }

});


/* Close mobile menu after clicking a link */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});


/* =========================
   SCROLL ANIMATIONS
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================
   APPOINTMENT DATE
========================= */

const dateInput = document.getElementById("date");

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

const todayString = `${year}-${month}-${day}`;

dateInput.setAttribute("min", todayString);


/* =========================
   APPOINTMENT FORM
========================= */

const appointmentForm =
    document.getElementById("appointmentForm");

const successMessage =
    document.getElementById("successMessage");


appointmentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const service =
        document.getElementById("service").value;

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;


    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        service === "" ||
        date === "" ||
        time === ""
    ) {

        alert("Please complete all required fields.");

        return;

    }


    successMessage.classList.add("show");

    successMessage.textContent =
        `✓ Thank you ${name}! Your ${service} appointment request for ${date} at ${time} has been submitted.`;


    appointmentForm.reset();

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    setTimeout(function () {

        successMessage.classList.remove("show");

    }, 7000);

});


/* =========================
   HEADER SCROLL EFFECT
========================= */

const header = document.getElementById("header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 8px 25px rgba(50, 30, 35, 0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});