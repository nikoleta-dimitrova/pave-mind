class Article {

    // class constructor
    constructor(id, date, title, preview, boldInfo, info, image, views) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.preview = preview;
        this.boldInfo = boldInfo;
        this.info = info;
        this.image = image;
        this.views = views;
    }

    setId(id) {
        this.id = id
    }
    getId() {
        return this.id;
    }

    setDate(date) {
        this.date = date
    }
    getDate() {
        return this.date;
    }

    setTitle(title) {
        this.title = title
    }
    getTitle() {
        return this.title
    }

    setPreview(preview) {
        this.preview = preview
    }
    getPreview() {
        return this.preview;
    }

    setBoldinfo(boldInfo) {
        this.boldInfo = boldInfo
    }
    getBoldinfo() {
        return this.boldInfo;
    }

    setInfo(info) {
        this.info = info
    }
    getBoldinfo() {
        return this.info;
    }

    setImage(image) {
        this.image = image
    }
    getImage() {
        return this.image;
    }

    setViews(views) {
        this.views = views
    }
    getViews() {
        return this.views;
    }
}

var articleList = [];
var articlesGrid = document.getElementById("articles-grid");
var filters = document.getElementById("articles-filter");
var bigArticleSection = document.querySelector(".articles-big");
var articleSearchBar = document.getElementById("search-input");

// Loading the JSON article data and returning the response (mock GET request) 
const loadArticles = (callback) => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './json/articles.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


const init = () => {
    loadArticles(function (response) {
        var articles = JSON.parse(response);
        articles.forEach(article => {
            var newArticle = new Article(article.id, new Date(article.date), article.title, article.preview, article.boldInfo, article.info, article.image, article.views)
            articleList.push(newArticle);
        })
        createArticlesContainer();
    })
}

const createArticlesContainer = () => {
    articlesGrid.innerHTML = "";
    articleList.forEach(article => {
        var articleContainer = document.createElement('div');
        articleContainer.className = "articles-card";

        var articleImage = document.createElement('img');
        articleImage.src = article.image;
        articleContainer.appendChild(articleImage);

        var articleInformation = document.createElement('div')
        articleInformation.className = "articles-information";
        var articleDate = document.createElement('span');
        articleDate.className = "articles-date";
        articleDate.textContent = article.date.toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" });
        var articleHeadline = document.createElement('div');
        articleHeadline.className = "articles-headline";
        articleHeadline.textContent = article.title;
        var articlePreview = document.createElement('div');
        articlePreview.className = "articles-preview";
        articlePreview.textContent = article.preview;
        articleInformation.append(articleDate, articleHeadline, articlePreview)
        articleContainer.appendChild(articleInformation);
        articlesGrid.appendChild(articleContainer);
    })
}

const filterArticles = () => {
    articlesGrid.style.marginTop = "2rem"
    if (filters.value === "Most viewed") {
        articleList.sort((a, b) => {
            return b.views - a.views;
        });
        bigArticleSection.style.display = "none"
    }
    else if (filters.value === "Oldest") {
        articleList.sort((a, b) => {
            return a.date - b.date;
        });
        bigArticleSection.style.display = "none"
    }
    else if (filters.value === "Newest") {
        articleList.sort((a, b) => {
            return b.date - a.date;
        });
        bigArticleSection.style.display = "none"
    }
    else {
        articlesGrid.style.marginTop = "0"
        bigArticleSection.style.display = "flex"
    }
    createArticlesContainer();
}

const searchArticles = () => {
    let articles = articlesGrid.childNodes;
    if (articleSearchBar.value.length === 0) {
        bigArticleSection.style.display = "flex";
        articlesGrid.style.marginTop = "0";
        articles.forEach(article => {
            article.style.display = "block";
        })
    }
    if (articleSearchBar.value.length > 2) {
        bigArticleSection.style.display = "none";
        articlesGrid.style.marginTop = "2rem"
        articles.forEach(article => {
            if (!article.childNodes[1].childNodes[1].textContent.toLowerCase().includes(articleSearchBar.value.toLowerCase())) {
                article.style.display = "none";
            }
            else {
                article.style.display = "block";
            }
        })
    }
}

window.onload = init();
