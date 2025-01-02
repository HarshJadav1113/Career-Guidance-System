document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-register-form");
    const toggleMessage = document.getElementById("toggle-message");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const logoutButton = document.getElementById("logout-button");
    const formTitle = document.getElementById("form-title");
    let isRegister = false;

    function updateToggleLink() {
        const toggleFormLink = document.getElementById("toggle-form");
        toggleFormLink.addEventListener("click", (e) => {
            e.preventDefault();
            isRegister = !isRegister;
            if (isRegister) {
                confirmPasswordInput.parentElement.style.display = "block";
                confirmPasswordInput.required = true;
                formTitle.textContent = "Register";
                toggleMessage.innerHTML = 'Already have an account?<br><a href="#" id="toggle-form">Login here</a>';
            } else {
                confirmPasswordInput.parentElement.style.display = "none";
                confirmPasswordInput.required = false;
                formTitle.textContent = "Login";
                toggleMessage.innerHTML = "Don't have an account?<br><a href=\"#\" id=\"toggle-form\">Register here</a>";
            }
            updateToggleLink(); // Re-apply the event listener
        });
    }

    // Initialize the event listener
    updateToggleLink();

    // Show password functionality
    document.getElementById("show-password").addEventListener("change", (e) => {
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirm-password");
        if (e.target.checked) {
            password.type = "text";
            if (isRegister) confirmPassword.type = "text";
        } else {
            password.type = "password";
            if (isRegister) confirmPassword.type = "password";
        }
    });

    // Check if user is logged in and show the appropriate content
    if (sessionStorage.getItem('isLoggedIn')) {
        // User is logged in
        form.style.display = "none"; // Hide login/register form
        logoutButton.style.display = "block"; // Show logout button
        toggleMessage.style.display = "none"; // Hide toggle message
    } else {
        // User is not logged in
        form.style.display = "block"; // Show login/register form
        logoutButton.style.display = "none"; // Hide logout button
        toggleMessage.style.display = "block"; // Show toggle message
    }

    // Logout functionality
    logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem('isLoggedIn'); // Remove isLoggedIn flag
        window.location.href = "login.html"; // Redirect to login page
    });

    // Form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
            ...(isRegister && { confirmPassword: formData.get("confirm-password") })
        };

        try {
            const response = await fetch(isRegister ? "/register" : "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                // Store a flag in sessionStorage to indicate the user is logged in
                sessionStorage.setItem('isLoggedIn', 'true');
                // Redirect to the main page after successful login or registration
                window.location.href = "main.html";
            } else {
                if (isRegister && result.message === 'User already exists') {
                    alert("You are already registered. Please login.");
                } else {
                    alert(result.message);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
