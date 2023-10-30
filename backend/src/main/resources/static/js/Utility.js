const MSG_FAIL = "Failed.";
const JSON_REQUEST_KEY_GOOGLE_RECAPTCHA_TOKEN = 'googleReCaptchaToken'; //Must be same as class member of AuthenticationRequest.java.
const STRING_EMPTY = '';

function getReCaptchaToken(clientSecretKey) {
    let recaptchaToken = grecaptcha.getResponse();
    // Check if the token is empty
    if (!recaptchaToken) {
        alert("Invalid Captcha. Please refresh the page and try again");
        return MSG_FAIL;
    }
    return recaptchaToken;
}

