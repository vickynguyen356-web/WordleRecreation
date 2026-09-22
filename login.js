// wait for doc to fully load 
document.addEventListener("DOMContentLoaded", () => {
    const continueBtn = document.getElementById("continue-btn");
    const emailInput = document.getElementById("email");
    const errorMsg = document.getElementById("errorContainer");
    const passwordContainer = document.getElementById("password-container");
    const editEmailBtn = document.getElementById("edit-email-btn");
    // error message icon
    const form = document.getElementById("loginForm");
    const errorContainer = document.getElementById("errorContainer");

    form.addEventListener("Continue", function (event)) {
        event.preventDefault(); // stop form submission
        // clear existing errors
        errorContainer.innerHTML = '';

        if (!emailInput.value.includes("@")) {
            // 1. create error element box
            const errorBox = document.createElement("div");
            errorBox.className = "error-msg-box";

            // 2. define inline SVG icon & message mark up 
            errorBox.innerHTML = `
            <svg class="error-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <span>Please enter a valid email address.</span>
                `;
            
            // 3. insert into page
            errorContainer.appendChild(errorBox);
        }
    }

    // email address text box border color when clicked
    const emailTextBox = document.getElementById("email");
    emailTextBox.classList.add("highlighted-box");

    let isEmailVerified = false; // tracks if we're on step 1 or 2
    continueBtn.addEventListener("click", () => {
        // step 2
        if (isEmailVerified) {
        const passwordInput = document.getElementById("password-input");
        if (passwordInput.value.length < 4) {
            errorMsg.textContent = "Password must be at least 4 characters."
        } else {
            errorMsg.textContent = "";
        }
        return;
    }

    // step 1
    const emailValue = emailInput.value.trim(); // gets rid of spaces
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "" || !emailPattern.test(emailValue)) {
        errorMsg.textContent = "Please enter a valid email address";
        errorMsg.style.color = "red";
        emailInput.style.borderColor = "red";
    } else {
        // go to password phase
        errorMsg.textContent = "";
        isEmailVerified = true;

        emailInput.disabled = true;
        passwordContainer.classList.remove("hidden"); // show password field
        editEmailBtn.classList.remove("hidden"); // show edit button
        continueBtn.textContent = "Log in";
    }
});

// edit button functionality
    editEmailBtn.addEventListener("click", () => {
        isEmailVerified = false;

        emailInput.disabled = false; // unlocks email box for editing
        passwordContainer.classList.add("hidden");
        editEmailBtn.classList.add("hidden");
        continueBtn.textContent = "Continue";
        emailInput.focus(); // puts cursor back in the box
    });
});