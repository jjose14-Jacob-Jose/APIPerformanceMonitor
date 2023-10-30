const MSG_VALIDATION_ERROR_USERNAME_CHARACTERS = "Username must only only contain alphabets and digits. It should have a length between 6 to 30 characters.";
const MSG_VALIDATION_ERROR_PASSWORD_CHARACTERS = "Your password must be between 6 and 30 characters long. It can contain alphabets, digits, and special characters.";
const MSG_VALIDATION_ERROR_PASSWORD_SPECIAL_CHARACTERS_ALLOWED = "Special Characters allowed: .!@#$%^&*()_+-=;:.,";
const MSG_NEW_LINE = "\n";
const MSG_VALIDATION_ERROR_PASSWORDS_DO_NOT_MATCH = "Passwords do not match.";
const FLAG_BOOLEAN_SUCCESS = true;
const FLAG_BOOLEAN_FAILURE = false;
const HTML_ID_USERNAME = "username";
const HTML_ID_PASSWORD = "password";
const HTML_ID_PASSWORD_REPEATED = "passwordRepeated";
const REGEX_VALIDATION_USERNAME = /^[A-Za-z0-9]{6,30}$/;
const REGEX_VALIDATION_PASSWORD = /^[A-Za-z0-9.!@#$%^&*()_+-=;:.,]{6,30}$/;

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

function signUp() {
    if(validatePassword() == FLAG_BOOLEAN_FAILURE)
        return;

    if(validateUsername() == FLAG_BOOLEAN_FAILURE)
        return;

}
