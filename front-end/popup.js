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