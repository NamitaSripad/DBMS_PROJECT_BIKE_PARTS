// Variable Declarations
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

// Form Submission Event Listener
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Basic Form Validation
    if (usernameInput.value === '' || passwordInput.value === '') {
        errorMessage.textContent = 'Please fill in all fields.';
        return; // Exit if validation fails
    }

    // Prepare Login Data
    const formData = new FormData(loginForm);

    // Send Login Request with Fetch API
    try {
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();

        let loginSuccessful = data === 'Login successful!';
        let errorMessageFromResponse = loginSuccessful ? '' : 'Invalid username or password.';

        // Process Login Results
        if (loginSuccessful) {
            alert('Login successful!');
            window.location.href = 'dashboard.php'; // Replace with your dashboard page
        } else {
            errorMessage.textContent = errorMessageFromResponse;
        }
    } catch (error) {
        console.error('Error during login:', error);
        errorMessage.textContent = 'An error occurred. Please try again later.';
    }
});
