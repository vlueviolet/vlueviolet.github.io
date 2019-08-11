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
  /*
  Creation 단계
  클라이언트 단과 서버단 렌더링 모두에서 처리해야할일이 있다면 이단계에서 하면된다.
  아직 컴포넌트가 돔에 추가되기 전이기 때문에 돔에 접근하거나 this.$el를 사용할 수 없다.
  이 단계에서는 beforeCreate 훅과 Created 훅이 있다.
  */
  beforeCreate() {
    /*
    모든 훅 중에 가장 먼저 실행되는 훅이다.
    아직 data와 events(vm.$on, vm.$once, vm.$off, vm.$emit)가 세팅되지 않은 시점이므로 접근하려고 하면 에러를 뿜어낼 것이다.
    */
  },
  created() {
    /*
    created 훅에서는 이제 data와 events가 활성화되어 접근할 수 있다.
    여전히 템플릿과 가상돔은 마운트 및 렌더링되지 않은 상태이다.
    컴포넌트 초기에 세팅되어야할 데이터 페치 사용
*/
      this.init();
  },
  /* 컴포넌트, 템플릿, 렌더링된 돔에 접근할 수 있는 상태 (인스턴스 라이프사이클에 속함)
    mounted 훅에서 유의할 점은,
    부모와 자식 관계의 컴포넌트에서 우리가 생각한 순서로 mounted가 발생하지 않는다는 점이다.
    즉 부모의 mounted훅이 자식의 mounted훅보다 먼저 실행되지 않는다. 오히려 그 반대이다.
    Created훅은 부모->자식의 순서로 실행되지만 mounted는 그렇지 않다는 것을 알 수 있다.
    다른 식으로 말하면 부모는 mounted훅을 실행하기 전에 자식의 mounted훅이 끝나기를 기다린다. 
  */
  mounted() {
    this.$nextTick(() => {
      // 뷰 라이프사이클에 의해 다음 코드 실행 시점에 데이터가 반영된다.
      // 모든 화면이 렌더링된 후 실행합니다.
    });
    this.$refs.email.focus();
  },
  //데이터가 변경되어 가상 DOM이 재 렌더링되고 패치되면 호출 (인스턴스 라이프사이클에 속함)
  updated() {
    /*
    이 훅은 컴포넌트의 데이터가 변하여 재 렌더링이 일어나 후에 실행된다.
    돔이 업데이트 완료된 상태이므로 돔 종속적인 연산을 할 수 있다.
    그러나 여기서 상태를 변경하면 무한루프에 빠질 수 있다.
    모든 자식 컴포넌트의 재 렌더링 상태를 보장하지는 않는다.
    */
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
    },
    /*
        computed 속성은 기본적으로 getter 함수만 가지고 있지만, 필요한 경우 setter 함수를 만들어 쓸 수 있습니다.
        이제 vm.fullName = 'John Doe'를 실행하면 설정자가 호출되고 vm.firstName과 vm.lastName이 그에 따라 업데이트 됩니다.
    */
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  },
  /*
  데이터 변경에 반응하는 보다 일반적인 방법을 제공합니다.
  이는 데이터 변경에 대한 응답으로 비동기식 또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유용합니다.
  Vue 인스턴스 내에 선언된 값의 변화를 감시하는 역할을 하기 때문에 Vue 인스턴스 내에 선언된 값을 그대로 다시 사용하게 됩니다
  */
  watch: {
    input(v) {
        this.valid = v.trim().length > 0
    },
    variable(newVal, oldVal) {
        console.log(newVal, oldVal)
    },
    '$store.state.visible' () {
      if (this.$store.state.visible) {
        clearInterval(this.intervalTimer);
      } else {
        this.setIntervalFunc();
      }
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
