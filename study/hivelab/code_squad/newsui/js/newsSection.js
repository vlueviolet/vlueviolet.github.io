export default class newsSection {
    constructor(fetchUrl) {
        this.fetchUrl = fetchUrl;
        this.currentIndex = 0;
        this.prevIndex = 0;
    }

    init(fnNewsListTemplate, fnCompanyTemplate) {
        // 서버로 보내서 fetch요청을 해야함
        this.fetchData(fnNewsListTemplate, fnCompanyTemplate);
    }

    fetchData(fnNewsListTemplate, fnCompanyTemplate) {
        // console.log(fnCompanyTemplate)
        // return;
        const newsListArray = [];
        const companyListArray = [];
        fetch(this.fetchUrl)
            .then(res => res.json())
            .then(data => {
                // 언론사별 뉴스 리스트
                data.forEach(array => newsListArray.push(fnNewsListTemplate(array)));
                document.querySelector('.content').innerHTML = newsListArray.join('');
                
                // 언론사 리스트
                data.forEach(array => companyListArray.push(fnCompanyTemplate(array)));
                document.querySelector('.newsNavigation').innerHTML = companyListArray.join('');
            })
            .then(_ => {
                this.setElements();
                this.bindEvents();
            })
    }

    // set setElements(obj) {
    //     console.log('set', obj)
    //     // return;
    //     this.btnLeft = document.querySelector(obj.btnLeft);
    //     this.btnRight = document.querySelector(obj.btnRight);
    //     this.slide = Array.from(document.querySelectorAll(obj.slide));
    //     this.navigationList = Array.from(document.querySelectorAll(obj.navigationList));
    //     console.log(this.btnLeft)
    // }

    setElements() {
        this.btnLeft = document.querySelector('.btn .left a');
        this.btnRight = document.querySelector('.btn .right a');
        this.slide = Array.from(document.querySelectorAll('.news_item'));
        this.navigationList = Array.from(document.querySelectorAll('.newsNavigation li'));
    }

    bindEvents() {
        this.btnLeft.addEventListener('click', () => this.moveSlide('left'));
        this.btnRight.addEventListener('click', () => this.moveSlide('right'));
        this.navigationList.forEach((array, index) => array.addEventListener('click', () => this.clickTitle(event, index)));
    }

    moveSlide(direction) {
        event.preventDefault();
        if (direction === 'right') {
            this.prevIndex = this.currentIndex;
            this.currentIndex++;
            if (this.currentIndex > this.slide.length-1) {
                this.currentIndex = 0;
            }
        }
        if (direction === 'left') {
            this.prevIndex = this.currentIndex;
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.slide.length-1;
            }
        }
        this.slide[this.prevIndex].style.display = 'none';
        this.slide[this.currentIndex].style.display = 'block';
        this.navigationList[this.prevIndex].classList.remove('is_active');
        this.navigationList[this.currentIndex].classList.add('is_active');

        // this.slide.forEach((array, index) => {
        //     if (index === this.currentIndex) {
        //         array.style.display = 'block';
        //     } else {
        //         array.style.display = 'none';
        //     }
        // })
    }
    clickTitle({target}, index) {
        if (target.parentNode.classList.contains('is_active')) return;
        this.prevIndex = this.currentIndex;
        this.currentIndex = index;

        this.navigationList[this.prevIndex].classList.remove('is_active');
        this.navigationList[this.currentIndex].classList.add('is_active');
        
        this.slide[this.prevIndex].style.display = 'none';
        this.slide[this.currentIndex].style.display = 'block';
    }
}
