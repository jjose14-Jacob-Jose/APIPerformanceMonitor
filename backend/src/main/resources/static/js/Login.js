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
    const request = new Request('/auth/admin/adminProfile', {
        method: 'GET',
        headers: {
            'Authorization': token,
        },
    });

    const response = await fetch(request);

    if (response.status === 200) {
        const html = await response.text();
        // Render the HTML response to the page.
        document.querySelector("body").innerHTML = html;
    } else {
        // Handle the error.
    }
}
