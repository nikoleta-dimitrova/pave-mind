// let fetchUrl = `http://localhost:3000/`; // Uncomment locally
let fetchUrl = `https://pave-mind.herokuapp.com/` // Uncomment when deployed

const loadAccount = () => {
    fetch(`${fetchUrl}accounts/${localStorage.getItem("userId")}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        return null;
    }).then(data => {
       document.getElementById("account-first-name").placeholder = data.firstName;
       document.getElementById("account-last-name").placeholder = data.lastName;
       document.getElementById("account-date").placeholder = data.dateOfBirth;
       document.getElementById("account-email").placeholder = data.email;
    })
}