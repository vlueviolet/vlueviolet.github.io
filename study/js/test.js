var a = function () {
    this.x = 'hello';
    this.type();
};

a.prototype = {
    type : function () {
        console.log('world');
    }
};

console.log(a);



// console.log(a.x);
// console.log(' <------ 이건 왜 undefined 인가요???');

var b = new a();
// console.log(b.x);
// console.log(a.prototype);