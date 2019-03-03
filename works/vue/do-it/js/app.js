new Vue({
    el: '#app',
    data: {
        flag: true,
        systems: ['android', 'ios', 'window'],
        uid: 10
    },
    methods: {
        popupAlert : function (n) {
            return alert(n + '경고창 표시')
        }
    }
});