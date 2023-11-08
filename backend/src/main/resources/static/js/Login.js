const HTML_ELEMENT_ID_DIV_LOADING_ANIMATION = "divLoader";
const HTML_ELEMENT_ID_BUTTON_SIGN_IN = "buttonSignIn";

// Submit login form.
function formSubmitLogin(event) {
    // event.preventDefault();

    setHtmlElementDisplay(HTML_ELEMENT_ID_DIV_LOADING_ANIMATION, VISIBILITY_STATUS_VISIBLE);
    setHtmlElementDisplay(HTML_ELEMENT_ID_BUTTON_SIGN_IN, VISIBILITY_STATUS_HIDDEN);

    const formData = new FormData(document.getElementById("formLogin"));

    // Adding Google reCaptcha token.
    let recaptchaToken = getReCaptchaToken();
    if (recaptchaToken === MSG_FAIL) {
        return;
    }
    formData.append("googleReCaptcha", recaptchaToken);

    const formDataJson = {};
    formData.forEach((value, key) => {
        formDataJson[key] = value;
    });


    fetch("/auth/generateToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataJson)
    })
        .then(response => {
            setHtmlElementDisplay(HTML_ELEMENT_ID_DIV_LOADING_ANIMATION, VISIBILITY_STATUS_HIDDEN);
            setHtmlElementDisplay(HTML_ELEMENT_ID_BUTTON_SIGN_IN, VISIBILITY_STATUS_VISIBLE);
            if (response.status === 200) {
                postToMain();
            } else {
                alert("Login failed. Please check your credentials. ");
            }
        })
        .catch(error => console.error(error));
}

async function postToMain() {
    const requestForHome = new Request('/home', {
        method: 'GET'
    });
    const responseForHome = await fetch(requestForHome);
    if (responseForHome.status === 200) {
        window.location.href = "/home";
    } else {
        // Handle the error.
    }
}

function redirectToSignup() {
    window.location.href = "/signup";
}

/**
 * Methods are run when the HTML method is loaded.
 *
 */
function main() {
    setHtmlElementDisplay(HTML_ELEMENT_ID_DIV_LOADING_ANIMATION, VISIBILITY_STATUS_HIDDEN);
}


/**
 * Specify functions to be executed when the documented is loaded.
 */
document.addEventListener('DOMContentLoaded', main);