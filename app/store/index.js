import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: () => ({
      showClipModal: false,
      title: '〇〇とは？？'
    }),
    mutations: {
      setShowClipModal(state) {
        state.showClipModal = !state.showClipModal
      },
      setTitle(state, title) {
        state.title = title
      }
    }
  })
}

export default store
