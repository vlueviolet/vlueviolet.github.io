import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/routes';
import VuexPersistence from 'vuex-persist';
import userInfo from '@/api/userInfo.js';
import apiMember from '@/api/member.js';
import timeline from '@/api/timeline.js'
import timelineModule from '@/store/modules/timeline.js'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
const store = new Vuex.Store({
    state: {  
      userInfo: {},
      isAuth: false,
      projectInfo: {
        delYn: 'n',
        insDate: null,
        insNo: null,
        insNoInfo: {
            deptNm: null,
            emailFrst: null,
            empNm: null,
            empNo: null
        },
        projectId: null,
        projectName: null,
        projectStateCode: false,
        startDate: null,
        endDate: null,
        uptDate: null,
        uptNo: null
      },
      memoList: [],
      memberList: [],
      searchMemberList : [],
    },
    getters: {
      getUserInfo(state){
        return state.userInfo;
      },
    },
    mutations: {
      SET_USER_INFO(state, data){
        state.userInfo = data;
      },
    },
    actions: {
      GET_USER_INFO({commit}){
        userInfo.getMyInfo()
          .then((r) => commit('SET_USER_INFO', r.data))
          .catch((err) => console.log(err))
      }
    },
    modules: { timelineModule },
    // Vuex 상태가 변이 핸들러 외부에서 변이 될 때 마다 오류가 발생, 디버깅 도구로 모든 상태 변이를 명시적으로 추적
    strict: true,    // 배포시 debug로 변경
    plugins: [vuexLocal.plugin]
});

export default store;
