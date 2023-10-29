// Submit login form.
function formSubmitLogin(event) {
    event.preventDefault();

    const recaptchaToken = grecaptcha.getResponse();
    // Check if the token is empty
    if (!recaptchaToken) {
        alert("Please complete the reCAPTCHA challenge.");
        return;
    }

    const formData = new FormData(document.getElementById("formLogin"));
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
            if (response.status === 200) {

                postToMain();
            } else {
                window.location.href = '/error';
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

/**
 * Sets site-key to Google reCaptcha.
 */
function setRecaptchaSiteKey() {
    var googleReCaptcha = document.getElementById("googleReCaptcha");
    googleReCaptcha.value = KEY_GOOGLE_RECAPTCHA_V2_SITE;
}

/**
 * The methods inside are executed after the page has finished execution.
 */
document.addEventListener('DOMContentLoaded', function() {
    setRecaptchaSiteKey();
});

