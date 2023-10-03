const DELAY_REDIRECTION_TO_HOME_FROM_ERROR_IN_MILLISECONDS = 5000;

/**
 * 'sendbutton' in index.html
 */
document.addEventListener("DOMContentLoaded", function () {
    const messageTextArea = document.getElementById("messageTextArea");
    const sendButton = document.getElementById("sendButton");

    sendButton.addEventListener("click", function () {
        const message = messageTextArea.value;

        if (message.trim() === "") {
            alert("Textarea is empty. Please enter a message.");
            return;
        }

        const requestData = {
            message: message
        };

        fetch('http://localhost:8080/main/apiCall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (response.ok) {
                    messageTextArea.value = ''; // Clear the textarea
                    alert('POST request sent successfully!');
                } else {
                    alert('Failed to send POST request.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while sending the POST request.');
            });
    });
});

/**
 * Redirect to 'index.html' from 'error.html'
 */
function redirectToHomePage() {
    setTimeout(function() {
        window.location.href = "/"; // Replace with your desired URL
    }, DELAY_REDIRECTION_TO_HOME_FROM_ERROR_IN_MILLISECONDS); // 1000 milliseconds = 1 seconds
}