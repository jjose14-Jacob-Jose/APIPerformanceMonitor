const DELAY_REDIRECTION_TO_HOME_FROM_ERROR_IN_MILLISECONDS = 5000;
const URL_GET_API_CALLS_ALL = "/getAPICalls";
const URL_GET_API_CALLS_ALL_HTTP_METHOD = "POST";
const URL_GET_API_CALLS_WITHIN_DATE_TIME_RANGE  = "/getAPICalls/range";
const URL_POST_API_CALL = "/apiCall";
const HTML_ID_DIV_RESPONSE_FROM_ALL_API_CALLS = "divBodyResponsesAllAPICallsTable";
const HTML_ID_TABLE_RESPONSE_FROM_ALL_API_CALLS = "tableResponseAllAPICalls";
const HTML_CSS_CLASS_TABLE_RESPONSE_FROM_ALL_API_CALLs = "tableResponse";
const MSG_FAIL = "Failed.";
const HTML_ID_TEXT_API_CALL_ID = "textCallId";
const HTML_ID_TEXTAREA_API_CALL_MESSAGE = "textAreaMessage";
const HTML_ID_TEXT_API_CALL_APPLICATION_NAME = "textApplicationName";
const HTML_ID_DATETIME_API_CALL_TIMESTAMP = "dateTimeLocalCallTimestamp";
const STRING_EMPTY = '';
const JSON_REQUEST_API_CALL_PARAMETER_ID = 'callId';
const JSON_REQUEST_API_CALL_PARAMETER_MESSAGE = 'callerMessage';
const JSON_REQUEST_API_CALL_PARAMETER_CALLER = 'callerName';
const JSON_REQUEST_API_CALL_PARAMETER_TIMESTAMP = 'callTimestampUTC';
const HTML_ID_DATETIME_RANGE_START = 'dateTimeAPICallsRangeStart';
const HTML_ID_DATETIME_RANGE_END = 'dateTimeAPICallsRangeEnd';


function stringIsEmpty(string) {
    if (string.trim() === STRING_EMPTY) {
        return true;
    } else {
        return false;
    }

}

/**
 * Event-listener for 'Send POST Request' button.
 */
function makeAPILog() {
    const id = document.getElementById(HTML_ID_TEXT_API_CALL_ID).value;
    const message = document.getElementById(HTML_ID_TEXTAREA_API_CALL_MESSAGE).value;
    const caller = document.getElementById(HTML_ID_TEXT_API_CALL_APPLICATION_NAME).value;
    const timestamp = document.getElementById(HTML_ID_DATETIME_API_CALL_TIMESTAMP).value;

    if (stringIsEmpty(message)) {
        alert("Message is empty. Please enter a message.");
        return;
    }
    if (stringIsEmpty(caller)) {
        alert("Caller name is empty. Please enter a caller name.");
        return;
    }

    const requestData = {
        [JSON_REQUEST_API_CALL_PARAMETER_MESSAGE]: message,
        [JSON_REQUEST_API_CALL_PARAMETER_CALLER]: caller
    };

    if (!(stringIsEmpty(id)) ) {
        requestData[JSON_REQUEST_API_CALL_PARAMETER_ID] = id;
    }

    console.log("timestamp: " + timestamp);

    if (!(stringIsEmpty(timestamp)) ) {
        requestData[JSON_REQUEST_API_CALL_PARAMETER_TIMESTAMP] = timestamp;
    }

    fetch(URL_POST_API_CALL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (response.ok) {
                id.value = STRING_EMPTY; // Clear the textarea
                message.value = STRING_EMPTY; // Clear the textarea
                caller.value = STRING_EMPTY; // Clear the textarea
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
}

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
 *  Make a POST request and return JSON
 * @param url
 * @param data
 * @param successCallback
 * @param errorCallback
 */
function getPostData(url, jsonDataInRequestBodyAsString, successCallback, errorCallback) {
    fetch(url, {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
            'Content-Type': 'application/json', // Set the content type if you are sending JSON data
        },
        // body: JSON.stringify(jsonDataInRequestBodyAsString), // Include the request body if needed
        body: jsonDataInRequestBodyAsString, // Include the request body if needed
    })
        .then(response => response.json())
        .then(responseJSONData => {
            // Call the successCallback function with the response data
            successCallback(responseJSONData);
        })
        .catch(error => {
            // Call the errorCallback function with the error
            errorCallback(error);
            console.error('Error while making a POST request to ' + url + ' Error: ', error);
        });
}

function fetchDataAndDisplayTableUsingPOST(url, idDiv, idTable, cssClassForTable, jsonDataInRequestBody ) {
    clearDivAndDeleteTables(idDiv);
    // Fetch the JSON data from your REST API using POST.
    getPostData(url, jsonDataInRequestBody,
        responseJSONData => {
            displayJSONAsTableOnDiv(responseJSONData, idDiv, idTable, cssClassForTable)
        },
        error => {
            console.error('Error while making a POST request to ' + url + ' Error: ', error);
        }
    );
}

/**
 * Convert the date range to ISO format.
 *
 */
function formatDateTimeRangeToISOFormat() {
    // Get the datetime-local input values
    const dateTimeRangeStartHTMLFormat = document.getElementById(HTML_ID_DATETIME_RANGE_START);
    const dateTimeRangeEndHTMLFormat = document.getElementById(HTML_ID_DATETIME_RANGE_END);

    // Check if both inputs have valid values
    if (dateTimeRangeStartHTMLFormat.value && dateTimeRangeEndHTMLFormat.value) {
        // Convert JavaScript Date objects to timestamps (milliseconds since Unix epoch)
        const dateTimeRangeStartString = new Date(dateTimeRangeStartHTMLFormat.value).toISOString();
        const dateTimeRangeEndString = new Date(dateTimeRangeEndHTMLFormat.value).toISOString();

        // Creating JavaScript object.
        // Name of object should be same as Model class in Java.
        const RequestForDateRange = {
            dateTimeRangeStartString : dateTimeRangeStartString,
            dateTimeRangeEndString : dateTimeRangeEndString
        };

        // Converting JavaScript object to JSON.
        const jsonForRequestBody = JSON.stringify(RequestForDateRange);

        fetchDataAndDisplayTableUsingPOST(URL_GET_API_CALLS_WITHIN_DATE_TIME_RANGE, HTML_ID_DIV_RESPONSE_FROM_ALL_API_CALLS, HTML_ID_TABLE_RESPONSE_FROM_ALL_API_CALLS, HTML_CSS_CLASS_TABLE_RESPONSE_FROM_ALL_API_CALLs, jsonForRequestBody);


    } else {
        // Handle the case when one or both inputs are empty
        printAsAlert('Enter starting and ending range.');
    }
}

/**
 *  Show an Alert.
 * @param message : string to be shown on Alert window.
 */
function printAsAlert(message) {
    alert(message);
}

/**
 * Clear contents of the input fields to log a new API call.
 */
function btnPostApiCallClear() {
    document.getElementById(HTML_ID_TEXT_API_CALL_ID).value = STRING_EMPTY;
    document.getElementById(HTML_ID_TEXTAREA_API_CALL_MESSAGE).value = STRING_EMPTY;
    document.getElementById(HTML_ID_TEXT_API_CALL_APPLICATION_NAME).value = STRING_EMPTY;
    document.getElementById(HTML_ID_DATETIME_API_CALL_TIMESTAMP).value = STRING_EMPTY;

    // Calling 'main' to display the original table again.
    main();
}

/**
 * Clear date-time fields of range selection.
 */
function btnApplyDateTimeRangeClear() {
    document.getElementById(HTML_ID_DATETIME_RANGE_START).value = STRING_EMPTY;
    document.getElementById(HTML_ID_DATETIME_RANGE_END).value = STRING_EMPTY;

    // Calling 'main' to display the original table again.
    main();
}

/**
 * Methods are run when the HTML method is loaded.
 *
 */
function main() {
    fetchDataAndDisplayTableUsingPOST(URL_GET_API_CALLS_ALL, HTML_ID_DIV_RESPONSE_FROM_ALL_API_CALLS, HTML_ID_TABLE_RESPONSE_FROM_ALL_API_CALLS, HTML_CSS_CLASS_TABLE_RESPONSE_FROM_ALL_API_CALLs);
}

/**
 * Specify functions to be executed when the documented is loaded.
 */
document.addEventListener('DOMContentLoaded', main);