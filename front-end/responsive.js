const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navBar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-menu li");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    // navLinks.forEach(link => {
    //     link.classList.toggle("fade")
    // });
    navBar.classList.toggle("active");
}

// navLinks.forEach((link, index)=>{
//     if(link.style.animation){
//       link.style.animation = ''
//     }else{
//           link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;

//     }
//   });

// hamburger.addEventListener('click', ()=>{
//     //Animate Links
//     navMenu.classList.toggle("open");
//     navLinks.forEach(link => {
//       link.classList.toggle("fade");
//     });
//     //Hamburger Animation
//     hamburger.classList.toggle("toggle");
//   });