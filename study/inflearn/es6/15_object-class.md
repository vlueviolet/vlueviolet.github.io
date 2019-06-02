# Object

<br>

## class를 통한 객체 생성
javascript에는 클래스가 없는데, es6에 class라는 키워드가 생겼다.

### 기존 function prototype
```javascript
function Health(name) {
    this.name = name;
}
Health.prototype.showHealth = function () {
    console.log(this.name + '님, 안녕하세요.'); // 
}
const h = new Health('crong');
h.showHealth();
```

### es6 class
모습만 class이지, function-prototype으로 연결된 구조와 같다.
(사실은 function이다..)
class로 하면 모듈화, 가독성이 좋기때문에 많은 사람들과 작업시에는 유용하다.
```javascript
class Health {
    constructor(name, lastTime) {
        this.name = name;
        this.lastTime = lastTime;
    }
    showHealth() {
        console.log('안녕하세요. ', this.name); // 안녕하세요.  crong
    }
}
const myHealth = new Health('crong');
myHealth.showHealth();
console.log(myHealth);  /* myHealth를 찍어보면, _proto_ 즉 prototype이 있는 것을 알 수 있다.
                            prototype 객체 안에 보완된 값이 class라고 생각하면 된다.
                            Health {name: "crong", lastTime: undefined}
                            lastTime: undefined
                            name: "crong"
                            __proto__: Object
                            */

console.log(toString.call(Health));   // [object Function], class가 아닌 함수임...
```