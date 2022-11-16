class Articles {

    // class constructor
    constructor(id, date, title, preview, boldInfo, info, image) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.preview = preview;
        this.boldInfo = boldInfo,
        this.info = info,
        this.image = image
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
}


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
