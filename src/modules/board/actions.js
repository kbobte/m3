export default {
  loadBoard: ({ commit }, payload) => {
    commit('SET_BOARD', payload)
  },
  addSource: ({ commit }, tile) => {
    commit('SET_SOURCE', tile)
  },
  addTarget: ({ commit }, tile) => {
    commit('SET_TARGET', tile)
  },
  swapTiles: ({ commit }) => {
    commit('SWAP_TILES')
  },
  clearSource: ({ commit }) => {
    commit('CLEAR_SOURCE')
  },
  markAsMatchedX: ({ commit }, payload) => {
    commit('MARK_MATCHED_X', payload)
  },
  markAsMatchedY: ({ commit }, payload) => {
    commit('MARK_MATCHED_Y', payload)
  },
  fillAction: ({ commit }, payload) => {
    commit('FILL_EMPTY', payload)
  },
  clearDropping: ({ commit }) => {
    commit('CLEAR_DROPPING')
  }
}
