const DELAY_REDIRECTION_TO_HOME_FROM_ERROR_IN_MILLISECONDS = 5000;
const URL_GET_ALL_API_CALLS = "/getAPICalls";
const DIV_RESPONSE_FROM_ALL_API_CALLS = "divBodyResponseAllAPICalls";

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

/**
 * Display JSON as a table on the specified div.
 * Table headers are dynamically created.
 * @param jsonData : Response from API.
 * @param divId : HTML div where the table is to be rendered.
 */
function displayJSONAsTableOnDiv(jsonData, divId) {
    const container = document.getElementById(divId);

    // Clear existing content in the container
    container.innerHTML = '';

    if (jsonData.length === 0) {
        // Handle the case when there is no data to display
        container.textContent = 'No data available';
        return;
    }

    // Create a table element
    const table = document.createElement('table');
    table.setAttribute('id', 'jsonTable');

    // Create an array of unique keys from the JSON objects
    const keys = Array.from(new Set(jsonData.flatMap(item => Object.keys(item))));

    // Create table headers based on the unique keys
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    keys.forEach(key => {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body and populate it with data
    const tbody = document.createElement('tbody');
    jsonData.forEach(item => {
        const row = document.createElement('tr');
        keys.forEach(key => {
            const cell = document.createElement('td');
            cell.textContent = item[key] || ''; // Handle undefined values
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}

function fetchDataAndDisplayTable() {
    // Fetch the JSON data from your REST API
    fetch(URL_GET_ALL_API_CALLS)
        .then(response => response.json())
        .then(responseJSONData => {
            // Call a function to display the JSON data as a table
            displayJSONAsTableOnDiv(responseJSONData, DIV_RESPONSE_FROM_ALL_API_CALLS);
        })
        .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndDisplayTable();
});