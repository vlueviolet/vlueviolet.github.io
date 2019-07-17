class Person {
    constructor(name, first, second) {
        this.name = name;
        this.first = first;
        this.second = second;
    }
    // 함수 생성
    sum() {
        return this.first + this.second;
    }
}

class PersonPlus extends Person {
    constructor(name, first, second, third) {
        super(name, first, second); // 부모 클래스의 constructor를 호출하여 속성 정의됨
        this.third = third;
    }
    sum() {
        // 부모 클래스의 함수 실행가능
        return super.sum() + this.third;
    }
    avg() {
        return (this.first + this.second)/2;
    }
}

let kim = new PersonPlus('kim', 10, 20, 30);
console.log(kim.sum()); // 30
console.log(kim.avg()); // 15