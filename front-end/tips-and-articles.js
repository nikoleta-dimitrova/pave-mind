class Article {

    // class constructor
    constructor(id, date, title, preview, boldInfo, info, image, views, saved) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.preview = preview;
        this.boldInfo = boldInfo;
        this.info = info;
        this.image = image;
        this.views = views;
        this.saved = saved;
    }

    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }

    setDate(date) {
        this.date = date;
    }
    getDate() {
        return this.date;
    }

    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title
    }

    setPreview(preview) {
        this.preview = preview;
    }
    getPreview() {
        return this.preview;
    }

    setBoldinfo(boldInfo) {
        this.boldInfo = boldInfo;
    }
    getBoldinfo() {
        return this.boldInfo;
    }

    setInfo(info) {
        this.info = info;
    }
    getinfo() {
        return this.info;
    }

    setImage(image) {
        this.image = image;
    }
    getImage() {
        return this.image;
    }

    setViews(views) {
        this.views = views;
    }
    getViews() {
        return this.views;
    }

    setSaved(saved) {
        this.saved = saved;
    }
    getSaved() {
        return this.saved;
    }
}

let dataList = [];
let savedArticles = [];
let articlesSorted = false;
let viewingSavedArticles = false;
let loader = document.querySelector(".lds-roller");
let articlesGrid = document.getElementById("articles-grid");
let filters = document.getElementById("articles-filter");
let bigArticleSection = document.querySelector(".articles-big");
let articleSearchBar = document.getElementById("search-input");

// Loading the JSON article data and returning the response (mock GET request) 
const loadJSONData = (callback, filePath) => {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './json/' + filePath, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


const init = (filePath, singleFile) => {
    loadJSONData(function (response) {
        let responseData = JSON.parse(response);
        responseData.forEach(responseItem => {
            let newArticle = new Article(responseItem.id, new Date(responseItem.date), responseItem.title, responseItem.preview, responseItem.boldInfo, responseItem.info, responseItem.image, responseItem.views)
            dataList.push(newArticle);
        })
        if (filePath === "articles.json") {
            if (singleFile) { loadArticle(dataList); }
            else { createArticlesContainer(dataList); }
        }
        else if (filePath === "tips.json" && singleFile) {
            loadTip(dataList);
        }
    }, filePath)
}

const renderSvg = (articleImageContainer, article, articlesSavedText) => {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    );

    iconSvg.setAttribute('viewBox', "0 0 24 24")
    iconSvg.classList.add("article-save-button")

    iconPath.setAttribute('d', "M6 21a1 1 0 0 1-.49-.13A1 1 0 0 1 5 20V5.33A2.28 2.28 0 0 1 7.2 3h9.6A2.28 2.28 0 0 1 19 5.33V20a1 1 0 0 1-.5.86 1 1 0 0 1-1 0l-5.67-3.21-5.33 3.2A1 1 0 0 1 6 21z");
    iconPath.setAttribute('fill', !article.saved ? 'transparent' : '#687dac');
    iconPath.setAttribute('stroke', "#687dac");

    iconSvg.appendChild(iconPath);
    iconSvg.addEventListener('click', function () {
        article.saved = !article.saved;
        if (article.saved) {
            savedArticles.push(article);
            articlesSavedText.style.display = "flex";
            setTimeout(() => {
                articlesSavedText.style.display = "none";
            }, 2000);
        }
        else {
            let articleIndex = savedArticles.indexOf(article)
            savedArticles.splice(articleIndex, 1);
        }
        iconPath.setAttribute('fill', !article.saved ? 'transparent' : '#687dac');
    })

    articleImageContainer.appendChild(iconSvg);
}

const createArticlesContainer = (articleArray) => {
    articlesGrid.innerHTML = "";
    articleArray.forEach(article => {
        let articleContainer = document.createElement('div');
        articleContainer.className = "articles-card";

        let articleImageContainer = document.createElement('div');
        articleImageContainer.className = "articles-image-container";
        let articleImage = document.createElement('img');
        articleImage.className = "article-image";
        articleImage.src = article.image;
        let articlesSavedText = document.createElement('div');
        articlesSavedText.classList.add('articles-saved-text');
        let articlesSavedTextParagraph = document.createElement('p');
        articlesSavedTextParagraph.innerText = "Saved!";
        articlesSavedText.appendChild(articlesSavedTextParagraph);
        articleImageContainer.append(articleImage, articlesSavedText);
        renderSvg(articleImageContainer, article, articlesSavedText);

        let articleInformation = document.createElement('div')
        articleInformation.className = "articles-information";
        let articleDate = document.createElement('span');
        articleDate.className = "articles-date";
        articleDate.textContent = article.date.toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" });
        let articleHeadline = document.createElement('div');
        articleHeadline.className = "articles-headline";
        articleHeadline.textContent = article.title;
        let articlePreview = document.createElement('div');
        articlePreview.className = "articles-preview";
        articlePreview.textContent = article.preview;
        let articleButton = document.createElement('a');
        articleButton.className = "primary-button";
        articleButton.id = "articles-small-button";
        articleButton.textContent = "Read more";
        let articleArrow = document.createElement('span');
        articleArrow.className = "articles-small-btn-arrow";
        articleButton.appendChild(articleArrow);

        articleInformation.append(articleDate, articleHeadline, articlePreview, articleButton)
        articleContainer.appendChild(articleImageContainer)
        articleContainer.appendChild(articleInformation);
        articlesGrid.appendChild(articleContainer);

        articleInformation.addEventListener('click', function () {
            openArticle(article.id);
        })
        articleImage.addEventListener('click', function () {
            openArticle(article.id);
        })
    })
}

const displayLoadingAnimation = () => {
    articlesGrid.style.display = "none";
    loader.style.display = "inline-block";
    setTimeout(() => {
        loader.style.display = "none";
        articlesGrid.style.display = "grid";
    }, 800);
}

const checkBigArticle = () => {
    if (articlesSorted || viewingSavedArticles || articleSearchBar.value.length > 2 || window.innerWidth <= 600) {
        articlesGrid.removeAttribute('data-aos')
        bigArticleSection.style.display = "none";
        articlesGrid.style.marginTop = "2rem";
        return;
    }
    else {
        loader.style.display = "none"
        articlesGrid.setAttribute('data-aos', 'fade-up')
        bigArticleSection.style.display = "flex";
        articlesGrid.style.marginTop = "0";
    }
}

const filterArticles = () => {
    articlesGrid.innerHTML = "";
    let listToFilter = dataList;
    if(viewingSavedArticles) { listToFilter = savedArticles }
    if (filters.value === "Most viewed") {
        listToFilter.sort((a, b) => {
            return b.views - a.views;
        });
        articlesSorted = true;
    }
    else if (filters.value === "Oldest") {
        listToFilter.sort((a, b) => {
            return a.date - b.date;
        });
        articlesSorted = true;
    }
    else if (filters.value === "Newest") {
        listToFilter.sort((a, b) => {
            return b.date - a.date;
        });
        articlesSorted = true;
    }
    else {
        articlesSorted = false;
    }
    displayLoadingAnimation();
    createArticlesContainer(listToFilter);
    checkBigArticle();
    searchArticles();
}

const showSavedArticles = () => {
    let viewSavedArticlesButton = document.getElementById('articles-save');
    viewingSavedArticles = !viewingSavedArticles;
    articleSearchBar.value = "";
    filters.value = "All articles";
    displayLoadingAnimation();
    if (viewingSavedArticles) {
        articlesSorted = false;
        viewSavedArticlesButton.src = "./Assets/Images/bookmark-filled.svg";
        createArticlesContainer(savedArticles);
    }
    else {
        articlesSorted = false;
        viewSavedArticlesButton.src = "./Assets/Images/bookmark.svg";
        createArticlesContainer(dataList);
    }
    checkBigArticle();
}

const searchArticles = () => {
    let articles = articlesGrid.childNodes;
    if (articleSearchBar.value.length <= 2) {
        articles.forEach(article => {
            article.style.display = "block";
        })
    }
    if (articleSearchBar.value.length > 2) {
        displayLoadingAnimation();
        articles.forEach(article => {
            if (!article.childNodes[1].childNodes[1].textContent.toLowerCase().includes(articleSearchBar.value.toLowerCase())) {
                article.style.display = "none";
            }
            else {
                article.style.display = "block";
            }
        })
    }
    checkBigArticle();
}

const loadArticle = (articleArray) => {
    articleArray.forEach(article => {
        if (article.id === localStorage.getItem('articleId')) {
            document.title = article.title;
            document.getElementById("article-date").innerHTML = article.date.toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" });
            document.getElementById("article-boldInfo").innerHTML = article.boldInfo;
            document.getElementById("article-image").src = article.image;
            document.getElementById("article-title").innerHTML = article.title;
            document.getElementById("article-information").innerHTML = article.info;
        }
    })
}

const loadTip = (tipArr) => {
    tipArr.forEach(tip => {
        if (tip.id === localStorage.getItem('tipId')) {
            document.title = tip.title;
            document.getElementById("article-boldInfo").innerHTML = tip.boldInfo;
            document.getElementById("article-image").src = tip.image;
            document.getElementById("article-title").innerHTML = tip.title;
            document.getElementById("article-information").innerHTML = tip.info;
        }
    })
}

const openBigArticle = () => {
    window.onscroll = function () {
        scrollFunction();
    };
}

const openArticle = (articleId) => {
    localStorage.setItem('articleId', articleId);
    window.location.replace("article.html")
}

const openTip = (tipId) => {
    localStorage.setItem('tipId', tipId);
    window.location.replace("tip.html")
}

const changeSlide = (next) => {
    let carousel = document.getElementById("continue-reading-carousel-content");
    if (next) carousel.scrollLeft += calculateVW(36);
    else carousel.scrollLeft -= calculateVW(36);
}

function calculateVW(percent) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

// Scroll to top button
let scrollToTopButton = document.querySelector(".button-scroll");
const scrollFunction = () => {
    if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
    ) {
        scrollToTopButton.style.display = "block";
        scrollToTopButton.style.bottom = "1.5rem";
    } else {
        scrollToTopButton.style.display = "none";
    }
}
const topFunction = () => {
    document.body.scrollTop = 0; // this is for safari
    document.documentElement.scrollTop = 0; // this is for everything with chrome and firefox
}

window.onscroll = function() {
    scrollFunction();
}