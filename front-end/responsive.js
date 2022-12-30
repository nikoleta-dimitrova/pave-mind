const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navBar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-menu li");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navBar.classList.toggle("active");
}


const checkLogIn = () => {
    const loginButton = document.getElementById("open-popup");
    if (localStorage.getItem("userId")) {
        loginButton.onclick = null;
        loginButton.childNodes[0].innerText = "Account";
        loginButton.childNodes[0].href = "./account.html";
    }
    else {
        loginButton.childNodes[0].innerText = "Log In";
    }
}

window.onload = checkLogIn();