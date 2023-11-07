const MSG_FAIL = "Failed.";
const JSON_REQUEST_KEY_GOOGLE_RECAPTCHA_TOKEN = 'googleReCaptchaToken'; //Must be same as class member of AuthenticationRequest.java.
const STRING_EMPTY = '';
const VISIBILITY_STATUS_VISIBLE = "block";
const VISIBILITY_STATUS_HIDDEN = "none"

/**
 * Return Google ReCaptcha Token from Google.
 * @param clientSecretKey Client secret key for Google reCaptcha.
 * @returns {*|string} MSG_FAIL or String token from Google.
 */
function getReCaptchaToken(clientSecretKey) {
    let recaptchaToken = grecaptcha.getResponse();
    // Check if the token is empty
    if (!recaptchaToken) {
        alert("Invalid Captcha. Please refresh the page and try again");
        return MSG_FAIL;
    }
    return recaptchaToken;
}

/**
 * Return value of a specific cookie.
 * @param cookieName header-name of the cookie to be retrieved.
 * @returns {STRING_EMPTY|string}
 */
function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }
    return STRING_EMPTY;
}

/**
 * Clear all cookies.
 */
function clearAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}

/**
 * Change an HTML elements visibility status.
 * @param htmlElementId id of the HTML element.
 * @param visibility 'block' or 'none'
 */
function setHtmlElementDisplay(htmlElementId, visibility) {
    let element = document.getElementById(htmlElementId);
    element.style.display = visibility;
}

/**
 *  Make a POST request and return JSON
 * @param url URL to which POST request is to be made.
 * @param jsonDataInRequestBodyAsString JSON in the request.
 * @param successCallback JavaScript method to be called on success status code response.
 * @param errorCallback  JavaScript method to be called on bad/failed HTTP status code response.
 */
function getPostData(url, jsonDataInRequestBodyAsString, successCallback, errorCallback) {
    fetch(url, {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
            'Content-Type': 'application/json',
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

/**
 * Print the message as an HTML alert.
 * @param message String to be shown as alert.
 */
function printInAlert(message) {
    alert(message);
}

/**
 * Set inner text of an HTML element.
 * @param htmlElementId HTML element id.
 * @param text String of text.
 */
function setHtmlElementInnerText(htmlElementId, text) {
    let element = document.getElementById(htmlElementId);
    element.innerText = text;
    element.style.display = VISIBILITY_STATUS_VISIBLE;
}
