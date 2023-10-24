// Submit login form.
function formSubmitLogin(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById("formLogin"));
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
                // Store the authorization token in a variable.
                const token = response.headers.get('Authorization');
                // Post to the main page.
                postToMain(token);
            } else {
                window.location.href = '/error';
            }
        })
        .catch(error => console.error(error));
}

async function postToMain(token) {
    const request = new Request('/home', {
        method: 'GET',
        headers: {
            'Authorization': token,
        },
    });

    const response = await fetch(request);

    if (response.status === 200) {
        const html = await response.text();

        // Create a new script element and set the src attribute to the path of the JS file.
        const scriptElement = document.createElement('script');
        scriptElement.src = '/js/MainScript.js';

        // Append the script element to the body of the current page.
        document.body.appendChild(scriptElement);

        // Create a new link element and set the href attribute to the path of the CSS file.
        const linkElement = document.createElement('link');
        linkElement.href = '/css/MainStyles.css';
        linkElement.rel = 'stylesheet';

        // Append the link element to the head of the current page.
        document.head.appendChild(linkElement);

        // Set the innerHTML of the body element to the HTML response.
        document.querySelector('body').innerHTML = html;
    } else {
        // Handle the error.
    }
}

