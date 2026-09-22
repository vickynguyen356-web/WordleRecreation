function toggleDropdown() {
    document.getElementById("helpDropdown").classList.toggle("show");
}

/* if user clicks outside, close dropdown */
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/* opens how to play popup */
function openHowToPlay() {
    // prevent page from jumping/redirecting
    event.preventDefault();

    // gets howToPlay dialog
    const dialog = document.getElementById("howToPlay");

    // show as a window
    if (dialog) {
        dialog.showModal();
    }

    // close help dropdown menu
    document.getElementById("helpDropdown").classList.remove("show");
}

/* constants for date */
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.toLocaleString("default", {month: "long"});
const currentYear = today.getFullYear();

/* calculating number of puzzles since start date */
function getWordleNumber() {
    // wordle started on june 19, 2021 
    const startDate = new Date("2021-06-19T00:00:00");
    
    // local midnight timestamp 
    const localMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // calculate difference in ms
    const timeDiff = localMidnight.getTime() - startDate.getTime();

    // convert ms to days, 1 day = 86,400,000 ms
    const daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return daysElapsed;
}

let wordleCounter = getWordleNumber();

/* wait for HTML elements to laod before displaying */
document.addEventListener("DOMContentLoaded", () => {
    /* text for date */
    const banner = document.getElementById("date");
    if (banner) {
        banner.textContent = currentMonth + " " + currentDay + ", " + currentYear;    
    }

    const numberElement = document.getElementById("number");
    if (numberElement) {
        numberElement.textContent = "No. " + wordleCounter;
    }

    /* for hints page */
    const hintString = "https://www.nytimes.com/";
    const hintElement = document.getElementById("hints-link");

    if(hintElement) {
    /* ensures months and days have 2 digits */
    const monthNum = String(today.getMonth() + 1).padStart(2, '0');
    const dayNum = String(today.getDate()).padStart(2, '0');

    /* assembling string */
    const completeURL = `${hintString}${currentYear}/${monthNum}/${dayNum-1}/crosswords/wordle-review-${wordleCounter}.html`;

    hintElement.href = completeURL;
    }
});