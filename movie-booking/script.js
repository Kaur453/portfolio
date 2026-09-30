/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const nav = document.getElementById("navLinks");

    nav.classList.toggle("show");
}


/* =========================
   MOVIE FILTER
========================= */

function filterMovies(category, button) {

    const cards = document.querySelectorAll(".movie-card");
    const buttons = document.querySelectorAll(".genre-btn");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    cards.forEach(card => {

        if (category === "all") {

            card.style.display = "block";

        } else if (card.dataset.genre === category) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });
}


/* =========================
   SEARCH MOVIES
========================= */

function searchMovies() {

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".movie-card");

    cards.forEach(card => {

        const title = card.dataset.title.toLowerCase();

        if (title.includes(search)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });
}


/* =========================
   BOOKING VARIABLES
========================= */

let selectedMovie = "";
let selectedTime = "";
let selectedSeats = [];

const ticketPrice = 10;


/* =========================
   OPEN MOVIE MODAL
========================= */

function openMovie(movieName) {

    selectedMovie = movieName;

    selectedTime = "";

    selectedSeats = [];

    document.getElementById("selectedMovie").textContent = movieName;

    document.getElementById("movieModal").style.display = "block";

    updateBookingSummary();

    resetTimes();

    resetSeats();
}


/* =========================
   CLOSE MOVIE MODAL
========================= */

function closeModal() {

    document.getElementById("movieModal").style.display = "none";
}


/* =========================
   SELECT SHOWTIME
========================= */

function selectTime(button) {

    const buttons = document.querySelectorAll(".showtimes button");

    buttons.forEach(btn => {

        btn.classList.remove("selected");

    });

    button.classList.add("selected");

    selectedTime = button.textContent;
}


/* =========================
   SELECT SEAT
========================= */

function selectSeat(button) {

    if (button.classList.contains("booked")) {

        return;

    }


    const seat = button.textContent;


    if (button.classList.contains("selected")) {

        button.classList.remove("selected");

        selectedSeats = selectedSeats.filter(item => item !== seat);

    } else {

        button.classList.add("selected");

        selectedSeats.push(seat);

    }


    updateBookingSummary();
}


/* =========================
   UPDATE PRICE
========================= */

function updateBookingSummary() {

    document.getElementById("seatCount").textContent =
        selectedSeats.length;

    const total = selectedSeats.length * ticketPrice;

    document.getElementById("totalPrice").textContent =
        total;
}


/* =========================
   CONFIRM BOOKING
========================= */

function confirmBooking() {

    if (selectedTime === "") {

        alert("Please select a showtime.");

        return;
    }


    if (selectedSeats.length === 0) {

        alert("Please select at least one seat.");

        return;
    }


    const booking = {

        movie: selectedMovie,

        time: selectedTime,

        seats: selectedSeats,

        total:
            selectedSeats.length * ticketPrice,

        date:
            new Date().toLocaleDateString()

    };


    localStorage.setItem(
        "cineBookBooking",
        JSON.stringify(booking)
    );


    document.getElementById("movieModal").style.display = "none";


    document.getElementById("confirmationText").innerHTML =

        `Your booking for <strong>${selectedMovie}</strong>
        at <strong>${selectedTime}</strong> is confirmed.<br><br>

        Seats: <strong>${selectedSeats.join(", ")}</strong><br>

        Total: <strong>€${booking.total}</strong>`;


    document.getElementById("confirmation").style.display = "flex";
}


/* =========================
   CLOSE CONFIRMATION
========================= */

function closeConfirmation() {

    document.getElementById("confirmation").style.display = "none";
}


/* =========================
   RESET TIMES
========================= */

function resetTimes() {

    const buttons =
        document.querySelectorAll(".showtimes button");

    buttons.forEach(button => {

        button.classList.remove("selected");

    });
}


/* =========================
   RESET SEATS
========================= */

function resetSeats() {

    const seats =
        document.querySelectorAll(".seats button");

    seats.forEach(seat => {

        seat.classList.remove("selected");

    });

    updateBookingSummary();
}


/* =========================
   CLOSE MODAL WHEN CLICKING
   OUTSIDE CONTENT
========================= */

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("movieModal");

    if (event.target === modal) {

        closeModal();

    }

});


/* =========================
   LOAD SAVED BOOKING
========================= */

const savedBooking =
    localStorage.getItem("cineBookBooking");

if (savedBooking) {

    console.log(
        "Previous CineBook booking:",
        JSON.parse(savedBooking)
    );
}