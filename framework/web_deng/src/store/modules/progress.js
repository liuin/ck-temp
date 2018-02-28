const progress = {
  namespaced: true,
  state:{
    per: 0,
    stopVal: 80
  },
  actions:{
    startLoad ({state, commit}) {
      commit('setState', [{per: 0}, state], {root: true})
      let timer = setInterval(() => {          
        if (state.per >= 80) {
          clearInterval(timer)
        }else {          
          commit('setState', [{per: state.per + 1 + Math.random() * 10}, state], {root: true})
        }
      },300)
    },
    endLoad ({state, commit}) {
      let timer = setInterval(() => {          
        if (state.per >= 100) {         
          commit('setState', [{per: 100}, state], {root: true})
          clearInterval(timer)
        }else {          
          commit('setState', [{per: state.per + 10}, state], {root: true})
        }
      },10)
    }
  }
}

export default progress
