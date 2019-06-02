<template>
    <div>
        <!-- props 사용 -->
        <div>{{data.title}}</div>
        <!-- filters 사용 -->
        <p class="title">[{{news.published_on | moment}}] {{news.title}}</p>
        <button type="button" @click="onClick">button</button>

        <!-- parent로 이벤트 전달-->
        child: <button type="button" @click="$emit('close')">button2</button>
        parent: <Components @close="onClose" />

        <!-- child에게 데이터 전달-->
        parent: <Components :data="input" />
        child: props: ['data'], this.data로 사용 가능
    </div>
</template>

<script>
import Components from './Components/Copoments.vue'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    props: ['data'],
    components: { Components, Components2 },
    // 데이터 객체
    data() {
        return {
            variable: true,
            object: {
                name: 'name',
                data: null
            },
            array: [1, 2, 3, 4],
            input: ''
        }
    },
    //데이터 포멧 제어
    filters: {
        // Moment date filter
        moment: function (date) {
            return moment.unix(date).format('mm:ss')
        }
    },
    created() {
        this.init();
    },
    //컴포넌트, 템플릿, 렌더링된 돔에 접근할 수 있는 상태 (인스턴스 라이프사이클에 속함)
    mounted() {
        this.$refs.email.focus();
    },
    //데이터가 변경되어 가상 DOM이 재 렌더링되고 패치되면 호출 (인스턴스 라이프사이클에 속함)
    updated() {

    },
    computed: {
        ...mapState({
            mapState: 'mapState'
        }),
        ...mapGetters([
        'isAuth'
        ]),
        isButtonActive() {
            return !this.email || !this.password
        },
        invalidInput() {
           return !this.inputTitle.trim()
        }
    },
    watch: {
        input(v) {
           this.valid = v.trim().length > 0
        },
        variable(newVal, oldVal) {
            console.log(newVal, oldVal)
        }
    },
    // Vue 인스턴스에 추가할 메소드
    methods: {
        ...mapMutations([   // 동기화 데이터
            'LOGOUT',
            'DECREASE'
        ]),
        ...mapActions([     // 비동기 데이터
            'LOGIN'
        ]),
        onClick() {
            // something..
        }
    }
}
</script>

<style>

</style>
