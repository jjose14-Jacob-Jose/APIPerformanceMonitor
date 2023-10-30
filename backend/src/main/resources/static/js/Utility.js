const MSG_FAIL = "Failed.";
const JSON_REQUEST_KEY_GOOGLE_RECAPTCHA_TOKEN = 'googleReCaptchaToken'; //Must be same as class member of AuthenticationRequest.java.
const STRING_EMPTY = '';

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