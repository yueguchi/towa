import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: () => ({
      showClipModal: false
    }),
    mutations: {
      setShowClipModal(state) {
        state.showClipModal = !state.showClipModal
      }
    }
  })
}

export default store
