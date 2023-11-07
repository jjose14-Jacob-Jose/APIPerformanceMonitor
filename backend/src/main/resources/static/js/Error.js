/**
 * Redirect to 'main.html' from 'error.html'
 */
function redirectToHomePage() {
    setTimeout(function() {
        window.location.href = "/"; // Replace with your desired URL
    }, DELAY_REDIRECTION_TO_HOME_FROM_ERROR_IN_MILLISECONDS); // 1000 milliseconds = 1 seconds
}

document.addEventListener('DOMContentLoaded', redirectToHomePage);