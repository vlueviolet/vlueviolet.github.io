let arrayIndex = 0;
let style = '';
const fnNewsListTemplate = ({logoImgUrl, company, thumbnews:{imageUrl}, thumbnews:{text}, newslist}) => {
    if (arrayIndex === 0) {
        style = 'block';
    } else {
        style = 'none';
    }
    arrayIndex++;
    
    return `<div class="news_item" style="display:${style}">
    <div class="title">
        <div class="logo-wrap">
            <img class="company" src="${logoImgUrl}" alt="${company}">
        </div>
            <button> <a href="#">X</a> </button>
        </div>
        <div class="newsList">
            <div class="img-title-wrap">
                <img src="${imageUrl}" alt="">
                <div class="title-desc">${text}</div>
            </div>
            <ul>
            ${newslist.reduce((html, newsTitle) => {
                return html + '<li>' + newsTitle + '</li>';
            }, "")}
            </ul>
        </div>
    </div>`
}

export {fnNewsListTemplate}