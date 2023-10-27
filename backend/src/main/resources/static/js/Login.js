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

