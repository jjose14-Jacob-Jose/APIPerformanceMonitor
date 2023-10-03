const DELAY_REDIRECTION_TO_HOME_FROM_ERROR_IN_MILLISECONDS = 5000;
const URL_GET_ALL_API_CALLS = "/getAPICalls";
const URL_POST_API_CALL = "/apiCall";
const HTML_ID_DIV_RESPONSE_FROM_ALL_API_CALLS = "divBodyResponsesAllAPICallsTable";
const HTML_ID_TABLE_RESPONSE_FROM_ALL_API_CALLS = "tableResponseAllAPICalls";
const CSS_CLASS_TABLE_RESPONSE = "tableResponse";
const MSG_FAIL = "Failed.";
const HTML_ID_TEXTAREA_API_CALL_MESSAGE = "textAreaMessage";
const HTML_ID_TEXT_API_CALL_APPLICATION_NAME = "textApplicationName";
const HTML_ID_BUTTON_API_CALL_POST_DATA = "btnPostApiCall";
const STRING_EMPTY = '';
const JSON_REQUEST_API_CALL_PARAMETER_MESSAGE = 'message';
const JSON_REQUEST_API_CALL_PARAMETER_CALLER = 'caller';

/**
 * Event-listener for 'Send POST Request' button.
 */
document.addEventListener("DOMContentLoaded", function () {
    const textAreaMessage = document.getElementById(HTML_ID_TEXTAREA_API_CALL_MESSAGE);
    const textApplicationName = document.getElementById(HTML_ID_TEXT_API_CALL_APPLICATION_NAME);
    const sendButton = document.getElementById(HTML_ID_BUTTON_API_CALL_POST_DATA);

    sendButton.addEventListener("click", function () {
        const message = textAreaMessage.value;
        const caller = textApplicationName.value;

        if (message.trim() === "") {
            alert("Message is empty. Please enter a message.");
            return;
        }

        if (caller.trim() === "") {
            alert("Caller is empty. Please enter a caller name.");
            return;
        }

        const requestData = {
            [JSON_REQUEST_API_CALL_PARAMETER_MESSAGE]: message,
            [JSON_REQUEST_API_CALL_PARAMETER_CALLER]: caller

        };

        fetch(URL_POST_API_CALL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (response.ok) {
                    textAreaMessage.value = STRING_EMPTY; // Clear the textarea
                    textApplicationName.value = STRING_EMPTY; // Clear the textarea
                    // Fetching and rendering the table.
                    main();
                } else {
                    alert(MSG_FAIL);
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
 * @param {Array} jsonData - Response from API.
 * @param {string} idDiv - ID of HTML div where the table is to be rendered.
 * @param {string} idHtmlTable - ID of HTML table that will be created.
 */
function displayJSONAsTableOnDiv(jsonData, idDiv, idHtmlTable, cssClassHTMLTable) {
    const container = document.getElementById(idDiv);

    // Clear existing content in the container
    // container.innerHTML = '';

    if (jsonData.length === 0) {
        // Handle the case when there is no data to display
        container.textContent = 'No data available';
        return;
    }

    // Create a table element
    const table = document.createElement('table');
    table.setAttribute('id', idHtmlTable);
    table.setAttribute('class', cssClassHTMLTable);

    // Create an array of unique keys from the JSON objects
    const keys = Array.from(new Set(jsonData.flatMap(item => Object.keys(item))));

    // Create an array to store filter input elements
    const filterInputs = [];

    // Create table headers based on the unique keys and add filtering inputs
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    keys.forEach(key => {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;

        // Create an input element for filtering
        const filterInput = document.createElement('input');
        filterInput.type = 'text';
        filterInput.placeholder = `Filter ${key}`;

        // Attach an input event listener for filtering
        filterInput.addEventListener('input', () => {
            filterTable(idHtmlTable, key, filterInput.value, keys); // Pass keys as a parameter
        });

        headerCell.appendChild(filterInput);
        filterInputs.push({ key, input: filterInput });

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

/**
 * Clears a div and deletes all tables inside it.
 * @param idDiv : ID of the HTML div.
 */
function clearDivAndDeleteTables(idDiv) {
    try {
        const div = document.getElementById(idDiv);
        const tables = div.getElementsByTagName('table');
        // Remove each table individually
        while (tables.length > 0) {
            const table = tables[0];
            table.remove();
        }
        // Clear the div content
        div.innerHTML = '';
    } catch (error) {
        // Handle any potential errors here
        console.error('clearDivAndDeleteTables('+idDiv+'): ', error);
    }
}


/**
 *  Adding text-field filters to HTML table's header.
 * @param idHtmlTable : ID of HTML table.
 * @param columnKey
 * @param filterText : Text for filtering data.
 * @param keys
 */
function filterTable(idHtmlTable, columnKey, filterText, keys) { // Pass keys as a parameter
    const table = document.getElementById(idHtmlTable);
    const tbody = table.querySelector('tbody');
    const rows = tbody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cell = row.querySelector(`td:nth-child(${keys.indexOf(columnKey) + 1})`);

        if (cell) {
            const cellText = cell.textContent;
            try {
                if (cellText.includes(filterText)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            } catch (error) {
                // Handle any errors here
                console.error('Error:', error);
            }
        }
    }
}


/**
 * Requests a URL and renders the responses on an HTML table with filters.
 * @param url : URL to which request is made.
 * @param idDiv : ID of HTML div where the table is to be rendered.
 * @param idHtmlTable : ID of the HTML table generated to display JSON response.
 */
function fetchDataAndDisplayTable(url, idDiv, idHtmlTable, cssClassHTMLTable) {
    clearDivAndDeleteTables(idDiv);
    // Fetch the JSON data from your REST API
    fetch(url)
        .then(response => response.json())
        .then(responseJSONData => {
            // Call a function to display the JSON data as a table
            displayJSONAsTableOnDiv(responseJSONData, idDiv, idHtmlTable, cssClassHTMLTable);
        })
        .catch(error => console.error('Error while fetching data from '+url+' Error: ', error));
}

/**
 * Methods are run when the HTML method is loaded.
 *
 */
function main() {
    fetchDataAndDisplayTable(URL_GET_ALL_API_CALLS, HTML_ID_DIV_RESPONSE_FROM_ALL_API_CALLS, HTML_ID_TABLE_RESPONSE_FROM_ALL_API_CALLS, CSS_CLASS_TABLE_RESPONSE);
}

/**
 * Specify functions to be executed when the documented is loaded.
 */
document.addEventListener('DOMContentLoaded', main);