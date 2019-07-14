const kim = {
    name: 'kim',
    first: 10,
    second: 20,
}
const lee = {
    name: 'lee',
    first: 2,
    second: 1
}
function sum(prefix) {
    return prefix + (this.first + this.second);
}

// call
console.log(sum.call(kim, 'kim : ')); // kim : 30
console.log(sum.call(lee, 'lee : ')); // lee : 3 

// bind
const kimSum = sum.bind(kim, 'kim => ');
// 새로운 취지로 바뀐 함수가 리턴된다. sum이 바뀌는 것은 아니다.
console.log(sum.bind(kim, 'kim => ')());
console.log(kimSum());