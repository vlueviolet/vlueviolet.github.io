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

import { createNamespacedHelpers } from 'vuex'
const timelineHelper = createNamespacedHelpers('timelineModule')

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
    /* computed 속성 대신 메소드와 같은 함수를 정의할 수도 있습니다.
       최종 결과에 대해 두 가지 접근 방식은 서로 동일합니다.
       차이점은 computed 속성은 종속 대상을 따라 저장(캐싱)된다는 것 입니다. 
       computed 속성은 해당 속성이 종속된 대상이 변경될 때만 함수를 실행합니다.
       즉 data속성의 변수가 변경되지 않는 한, computed 속성인 함수를 여러 번 요청해도 계산을 다시 하지 않고
       계산되어 있던 결과를 즉시 반환합니다.
    */
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
