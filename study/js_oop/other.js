function Person(name, first, second) {
    this.name = name;
    this.first = first;
    this.second = second;
}

Person.prototype.sum = function () {
    return this.first + this.second;
}

function PersonPlus(name, first, second, third) {
    /**
     * 상속자를 이용한 상속시에는 this에 주목해야 한다.
     * super(name, first, second)와 같은 일을 한다.
     * 이렇게 한다고 해서 상속이 되는것이 아니다. Person이라는 객체를 호출한 것 뿐이다.
     * 그렇기 때문에 kim.sum()을 실행할 수 없다. 왜냐하면, sum은 Person의 prototype 객체가 갖고 있기 때문에..
     */
    Person.call(this, name, first, second);
    this.third = third;
}
// PersonPlus.prototype.__proto__ = Person.prototype;
PersonPlus.prototype = Object.create(Person.prototype);
PersonPlus.prototype.avg = function () {
    return (this.first + this.second + this.third)/3;
}

let kim = new PersonPlus('kim', 10, 20, 30);
console.log(kim.sum()); // 30
console.log(kim.avg()); // 20
console.log(kim.constructor);