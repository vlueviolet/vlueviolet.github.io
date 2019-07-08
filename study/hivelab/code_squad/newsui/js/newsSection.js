export default class newsSection {
    constructor(fetchUrl) {
        this.fetchUrl = fetchUrl;
        this.currentIndex = 0;
        this.preveIndex = 0;
    }

    init(fnNewsListTemplate, fnNewsTitleTemplate) {
        // 서버로 보내서 fetch요청을 해야함
        this.fetchData(fnNewsListTemplate, fnNewsTitleTemplate);
    }

    fetchData(fnNewsListTemplate, fnNewsTitleTemplate) {
        // console.log(fnNewsTitleTemplate)
        // return;
        const textArray = [];
        const textArray2 = [];
        fetch(this.fetchUrl)
            .then(res => res.json())
            .then(data => {
                data.forEach(array => textArray.push(fnNewsListTemplate(array)));
                document.querySelector('.content').innerHTML = textArray.join('');
                
                data.forEach(array => textArray2.push(fnNewsTitleTemplate(array)));
                document.querySelector('.newsNavigation').innerHTML = textArray2.join('');
            })
            .then(_ => {
                this.setElements();
                this.bindEvents();
            })
    }

    setElements() {
        this.btnLeft = document.querySelector('.btn .left a');
        this.btnRight = document.querySelector('.btn .right a');
        this.slide = Array.from(document.querySelectorAll('.news_item'));
        this.navigationList = Array.from(document.querySelectorAll('.newsNavigation li'));
    }

    bindEvents() {
        this.btnLeft.addEventListener('click', () => this.moveSlide('left'));
        this.btnRight.addEventListener('click', () => this.moveSlide('right'));
        this.navigationList.forEach(array => array.addEventListener('click', () => this.clickTitle(event)));
    }

    moveSlide(direction) {
        event.preventDefault();
        if (direction === 'right') {
            this.preveIndex = this.currentIndex;
            this.currentIndex++;
            if (this.currentIndex > this.slide.length-1) {
                this.currentIndex = 0;
            }
        }
        if (direction === 'left') {
            this.preveIndex = this.currentIndex;
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.slide.length-1;
            }
            
        }
        this.slide[this.preveIndex].style.display = 'none';
        this.slide[this.currentIndex].style.display = 'block';
        this.navigationList[this.preveIndex].classList.remove('is_active');
        this.navigationList[this.currentIndex].classList.add('is_active');

        // this.slide.forEach((array, index) => {
        //     if (index === this.currentIndex) {
        //         array.style.display = 'block';
        //     } else {
        //         array.style.display = 'none';
        //     }
        // })
    }
    clickTitle({target}) {
        if (target.parentNode.classList.contains('is_active')) return;
        this.preveIndex = this.currentIndex;
        console.log(target.index())
        target.parentNode.classList.add('is_active');
    }
}
