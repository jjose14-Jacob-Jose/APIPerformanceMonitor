const MSG_VALIDATION_ERROR_USERNAME_CHARACTERS = "Username must only only contain alphabets and digits. It should have a length between 6 to 30 characters.";
const MSG_VALIDATION_ERROR_PASSWORD_CHARACTERS = "Your password must be between 6 and 30 characters long. It can contain alphabets, digits, and special characters.";
const MSG_VALIDATION_ERROR_PASSWORD_SPECIAL_CHARACTERS_ALLOWED = "Special Characters allowed: .!@#$%^&*()_+-=;:.,";
const MSG_NEW_LINE = "\n";
const MSG_VALIDATION_ERROR_GOOGLE_RECAPTCHA_FAILED = "Too many requests. Please try again after 15 minutes.";
const MSG_VALIDATION_ERROR_PASSWORDS_DO_NOT_MATCH = "Passwords do not match.";
const MSG_REGISTRATION_REQUEST_FAILED = "Could not register user account. Please try again after 1 hour";
const FLAG_BOOLEAN_SUCCESS = true;
const FLAG_BOOLEAN_FAILURE = false;
const HTML_ID_USERNAME = "username";
const HTML_ID_PASSWORD = "password";
const HTML_ID_PASSWORD_REPEATED = "passwordRepeated";
const REGEX_VALIDATION_USERNAME = /^[A-Za-z0-9]{6,30}$/;
const REGEX_VALIDATION_PASSWORD = /^[A-Za-z0-9.!@#$%^&*()_+-=;:.,]{6,30}$/;
const JSON_REQUEST_KEY_APM_USER_NAME_FIRST = "nameFirst";
const JSON_REQUEST_KEY_APM_USER_NAME_LAST = "nameLast";
const JSON_REQUEST_KEY_APM_USER_USERNAME = "username";
const JSON_REQUEST_KEY_APM_USER_EMAIL_ID = "emailId";
const JSON_REQUEST_KEY_APM_USER_PASSWORD = "password";
const JSON_REQUEST_KEY_APM_USER_PASSWORD_REPEATED = "passwordRepeated";
const URL_USER_SIGN_UP = "/auth/addNewUser";
const URL_DASHBOARD = "/home"

/**
 * Print the message as an HTML alert.
 * @param message String to be shown as alert.
 */
function printInAlert(message) {
    alert(message);
}

/**
 * Check if the passwords match.
 * @returns {boolean}: FLAG_BOOLEAN_SUCCESS or FLAG_BOOLEAN_FAILURE.
 */
function validatePassword() {
    const password = document.getElementById(HTML_ID_PASSWORD).value;

    if (REGEX_VALIDATION_PASSWORD.test(password))
    {
        // Password conforms to regex standard.
    } else {
        printInAlert(
            MSG_VALIDATION_ERROR_PASSWORD_CHARACTERS +
            MSG_NEW_LINE +
            MSG_VALIDATION_ERROR_PASSWORD_SPECIAL_CHARACTERS_ALLOWED
        );
        return FLAG_BOOLEAN_FAILURE;
    }

    const repeatedPassword = document.getElementById(HTML_ID_PASSWORD_REPEATED).value;
    if (password !== repeatedPassword) {
        printInAlert(MSG_VALIDATION_ERROR_PASSWORDS_DO_NOT_MATCH);
        return FLAG_BOOLEAN_FAILURE;
    }

    return FLAG_BOOLEAN_SUCCESS;


}

/**
 * Method to check the username.
 * @returns {boolean}: FLAG_BOOLEAN_SUCCESS or FLAG_BOOLEAN_FAILURE.
 */
function validateUsername() {
    const username = document.getElementById(HTML_ID_USERNAME).value;

    if (REGEX_VALIDATION_USERNAME.test(username))
    {
        return FLAG_BOOLEAN_SUCCESS;
    } else {
        printInAlert(MSG_VALIDATION_ERROR_USERNAME_CHARACTERS)
        return FLAG_BOOLEAN_FAILURE;
    }

}

/**
 * Clear values of input fields.
 */
function clearInputFields() {
    document.getElementById(JSON_REQUEST_KEY_APM_USER_NAME_FIRST).value = STRING_EMPTY;
    document.getElementById(JSON_REQUEST_KEY_APM_USER_NAME_LAST).value = STRING_EMPTY;
    document.getElementById(JSON_REQUEST_KEY_APM_USER_USERNAME).value = STRING_EMPTY;
    document.getElementById(JSON_REQUEST_KEY_APM_USER_EMAIL_ID).value = STRING_EMPTY;
    document.getElementById(JSON_REQUEST_KEY_APM_USER_PASSWORD).value = STRING_EMPTY; 
    document.getElementById(JSON_REQUEST_KEY_APM_USER_PASSWORD_REPEATED).value = STRING_EMPTY; 
}

/**
 * This function is called after Google issues a token for reCaptcha
 */
function signUp() {

    if(validatePassword() == FLAG_BOOLEAN_FAILURE)
        return;

    if(validateUsername() == FLAG_BOOLEAN_FAILURE)
        return;

    // Adding Google reCaptcha token.
    let recaptchaToken = getReCaptchaToken();
    if (recaptchaToken === MSG_FAIL) {
        // Invalid Google reCaptcha.
        printAsAlert(MSG_VALIDATION_ERROR_GOOGLE_RECAPTCHA_FAILED);
        return;
    }

    const apmUserRegistration = {
        [JSON_REQUEST_KEY_APM_USER_NAME_FIRST]: document.getElementById(JSON_REQUEST_KEY_APM_USER_NAME_FIRST).value,
        [JSON_REQUEST_KEY_APM_USER_NAME_LAST]: document.getElementById(JSON_REQUEST_KEY_APM_USER_NAME_LAST).value,
        [JSON_REQUEST_KEY_APM_USER_USERNAME]: document.getElementById(JSON_REQUEST_KEY_APM_USER_USERNAME).value,
        [JSON_REQUEST_KEY_APM_USER_EMAIL_ID]: document.getElementById(JSON_REQUEST_KEY_APM_USER_EMAIL_ID).value,
        [JSON_REQUEST_KEY_APM_USER_PASSWORD]: document.getElementById(JSON_REQUEST_KEY_APM_USER_PASSWORD).value,
    };


    fetch(URL_USER_SIGN_UP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(apmUserRegistration)
    })
        .then(response => {
            if (response.ok) {
                clearInputFields();
                window.location.href = URL_DASHBOARD;
            } else {
                alert(MSG_REGISTRATION_REQUEST_FAILED);
            }
        })
        .catch(error => {
            console.error('User registration failed:', error);
            printInAlert(MSG_REGISTRATION_REQUEST_FAILED);
        });
}