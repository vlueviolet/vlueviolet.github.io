import newsSection from './newsSection.js'
import {fnNewsListTemplate} from '../templates/news.js'
import {fnCompanyTemplate} from '../templates/company.js'

// dom tree가 만들어졌을떄, 즉 javascript에 접근할 수 있을 떄
window.addEventListener("DOMContentLoaded", () => {
    const url = "/data/newslist.json";
    const news = new newsSection(url);
    
    // const obj = {
    //     btnLeft: '.btn .left a',
    //     btnRight: '.btn .right a',
    //     slide: '.news_item',
    //     navigationList: '.newsNavigation li'
    // }
    news.init(fnNewsListTemplate, fnCompanyTemplate);
    // news.setElements = obj;
});