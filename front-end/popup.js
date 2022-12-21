

document.querySelector("#open-popup").addEventListener("click",async ()=>{
    let response=await fetch("login.html")
    let html_response=await response.text()
    document.querySelector("div#popup").innerHTML=html_response
})

document.querySelector("button#close-popup").addEventListener("click", async ()=>{
    const popup = document.getElementById("popup")
    popup.innerHTML = '';
})

console.log(document.getElementById("lognin-signup-btn"))

function loginToSignup(){
    async function logTOsign(){ 
        let response=await fetch("signin.html")
        console.log(response)
        let html_response=await response.text()
        document.querySelector("div#popup").innerHTML=html_response
    }
    logTOsign()
}

function signupToLogo(){
    async function signTOlog(){ 
        let response=await fetch("login.html")
        console.log(response)
        let html_response=await response.text()
        document.querySelector("div#popup").innerHTML=html_response
    }
    signTOlog()
}

function signinToPayment(){
    async function sigTOpay(){ 
        let response=await fetch("payment.html")
        console.log(response)
        let html_response=await response.text()
        document.querySelector("div#popup").innerHTML=html_response
    }
    sigTOpay()
}

function removeLogin(){
    var element = document.getElementById("login-popup-container")
    element.remove();
}

function removeSignin(){
    var element = document.getElementById("signin-popup-container")
    element.remove();
}

function removePayment(){
    var element = document.getElementById("payment-popup-container")
    element.remove();
}