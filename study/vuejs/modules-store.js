import api from '@/api/timeline.js'
import router from '@/routes';

const state = {
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
    memoList: []
}

const getters = {
    // cartProducts: (state, getters, rootState) => {
    //     return state.items.map(({ id, quantity }) => {
    //         const product = rootState.products.all.find(product => product.id === id)
    //         return {
    //             title: product.title,
    //             price: product.price,
    //             quantity
    //       }
    //     })
    // },
}

const mutations = {
    SET_PROJECT_INFO(state, ...data) {
        // state.projectInfo.projectName = data.projectName;
        // console.log(state.projectInfo.projectName, data.projectName)


        state.projectInfo = [...data][0];
        // console.log(1, ...data)
        // console.log(2, toString.call(...data))
        // console.log(3, state.projectInfo)
        // console.log(4, toString.call(state.projectInfo))
        // console.log(5, [...data][0]);
        // console.log(state.projectInfo.projectName)
    },
    SET_MEMO_LIST(state, data) {
        state.memoList = data;
        // console.log(data)
    }
}

const actions = {
    GET_PROJECT_INFO({ commit }, projectId) {
        return api.getProjectInfo(projectId)
            .then(result => {
                // console.log(result.data.result)
                if (result.data.result === SUCCESS) {
                    commit('SET_PROJECT_INFO', result.data.body);
                } else {
                    alert('해당 프로젝트가 없습니다. 프로젝트 리스트 페이지로 이동합니다.');
                    router.push('/project');
                }
                return result;
            })
            .catch(error => {
                alert('API Error...', error);
                router.push('/');
            });
    },
    GET_MEMO_LIST({ commit }, projectId) {
        return api.getMemoList(projectId)
            .then(result => commit('SET_MEMO_LIST', result.data.body));
    },
    // checkout ({ commit, state }, products) {
    //     const savedCartItems = [...state.items]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', { items: [] })
    //     api.buyProducts(
    //         products,
    //             () => commit('setCheckoutStatus', 'successful'),
    //             () => {
    //                 commit('setCheckoutStatus', 'failed')
    //                 // rollback to the cart saved before sending the request
    //                 commit('setCartItems', { items: savedCartItems })
    //         }
    // )
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
