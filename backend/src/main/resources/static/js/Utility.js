
function getReCaptchaToken(clientSecretKey) {
    let recaptchaToken = grecaptcha.getResponse();
    // Check if the token is empty
    if (!recaptchaToken) {
        alert("Invalid Captcha. Please refresh the page and try again");
        return MSG_FAIL;
    }
    return recaptchaToken;
}

