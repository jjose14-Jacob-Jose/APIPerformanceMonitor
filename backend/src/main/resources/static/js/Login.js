// Submit login form.
function formSubmitLogin(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById("formLogin"));
    const formDataJson = {};
    formData.forEach((value, key) => {
        formDataJson[key] = value;
    });

    fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataJson)
    })
        .then(response => {
            if (response.status === 200) {
                // Redirect the user to the login page
                window.location.href = '/main';
            } else {
                // The user is authenticated
                // Render the HTML page
                console.log(response.json());
                window.location.href = '/error';
            }
        })
        .catch(error => console.error(error));
}