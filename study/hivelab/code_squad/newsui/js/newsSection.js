export default class newsSection {
    constructor(fetchUrl) {
        this.fetchUrl = fetchUrl;
        this.currentIndex = 0;
        this.preveIndex = 0;
    }

    init(fnNewsListTemplate) {
        // 서버로 보내서 fetch요청을 해야함
        this.fetchData(fnNewsListTemplate);
    }

    fetchData(fnNewsListTemplate) {
        const textArray = [];
        fetch(this.fetchUrl)
            .then(res => res.json())
            .then(data => {
                data.forEach(array => textArray.push(fnNewsListTemplate(array)));
                document.querySelector('.content').innerHTML = textArray.join('');
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
    }

    bindEvents() {
        this.btnLeft.addEventListener('click', () => this.moveSlide('left'));
        this.btnRight.addEventListener('click', () => this.moveSlide('right'));
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

        // this.slide.forEach((array, index) => {
        //     if (index === this.currentIndex) {
        //         array.style.display = 'block';
        //     } else {
        //         array.style.display = 'none';
        //     }
        // })
    }

}
