let popup = document.getElementById("popup-blur");
let popupTitle = document.getElementById("community-popup-title");
let popUpVisible = false;

const loadPosts = () => {
    fetch("http://localhost:3000/posts/").then((response) => {
        response.json().then(async data => {

            // document.querySelector(".community-post-name").innerHTML = await getUser(data[0].accountId)
            document.querySelector(".community-post-title").innerHTML = data[0].title;
            document.querySelector(".community-post-body").innerHTML = data[0].content
            document.querySelector(".community-comment-name").innerHTML = data[0].comments[0].comment
        })
    });
}

const getUser = async (id) => {
    const user = await fetch(`http://localhost:3000/accounts/${id}`)
    user.json().then(data => {
        return `${data.firstName} ${data.lastName}`;
    })
}

const togglePopup = () => {
    popUpVisible = !popUpVisible;
    if(popUpVisible) {
        popup.style.display = "block";
        popupTitle.focus();
    }
    else {
        popup.style.display = "none";
    }
}

