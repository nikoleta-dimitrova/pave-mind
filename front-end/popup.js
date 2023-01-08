// let fetchUrl = `http://localhost:3000/`; // Uncomment locally
let fetchUrl = `https://pave-mind.herokuapp.com/` // Uncomment when deployed

async function loadPopupContent(popup) {
    const response = await fetch(popup);
    const html_response = await response.text()
    document.querySelector("div#popup").innerHTML = html_response
}

function closeLoginPopup() {
    const element = document.getElementById("login-popup-container")
    element.remove();
}

function closeSigninPopup() {
    const element = document.getElementById("signin-popup-container")
    element.remove();
}

function closePaymentPopup() {
    const element = document.getElementById("payment-popup-container")
    element.remove();
}

const advanceToPayment = (password, repeatPassword) => {
    if (password === repeatPassword) return true;
    return false;
}
let userAccount = {}

const submitSignIn = () => {
    const password = document.getElementById("passwordInput");
    const repeatPassword = document.getElementById("repeatPasswordInput");
    if (!advanceToPayment(password.value, repeatPassword.value)) {
        console.log("Passwords need to match!")
        return;
    }
    const email = document.getElementById("emailInput");
    const firstName = document.getElementById("firstNameInput");
    const lastName = document.getElementById("lastNameInput");
    const dateOfBirth = document.getElementById("dateInput");
    userAccount = {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfBirth: dateOfBirth.value
    };
    loadPopupContent('payment.html');
}

const createAccount = (premium) => {
    userAccount["premiumAccount"] = premium;
    fetch(`${fetchUrl}accounts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userAccount)
    }).then(res => {
        if (res.status === 201) {
            return res.json();
        }
    }).then(data => {
        closePaymentPopup();
        localStorage.setItem("userId", data._id);
        localStorage.setItem("userName", `${data.firstName} ${data.lastName}`)
        window.location.pathname = "front-end/index.html";
        window.location.reload();
    })
}

const logInUser = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    fetch(`${fetchUrl}accounts/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        return null;
    }).then(data => {
        if (data === null) return;
        closeLoginPopup();
        localStorage.setItem("userId", data._id);
        localStorage.setItem("userName", `${data.firstName} ${data.lastName}`)
        window.location.pathname = "front-end/index.html";
        window.location.reload();
    })
}

const logOut = () => {
    let confirmAction = confirm("Are you sure to execute this action?");
    if (confirmAction) {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        window.location.pathname = "front-end/index.html";
        window.location.reload();
        alert("You've logged out successfully!");
    } else {
        alert("Action canceled");
    }
}

const createPost = () => {
    const title = document.getElementById("community-popup-title");
    const content = document.getElementById("community-popup-description");
    const newPost = {
        title: title.value,
        content: content.value,
        accountId: localStorage.getItem("userId")
    }
    fetch(`${fetchUrl}posts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost)
    }).then(res => {
        if (res.status === 201) {
            return res.json();
        }
    }).then(() => {
        window.location.reload();
    })
}