import globalMutations from 'common/src/store/mutations'
import * as types from './mutation-types'
import Vue from 'vue'

const localMutations = {
  [types.CACHE_REPS] (state, mutateObj) {
    Vue.set(state.cache, 'reps', mutateObj.data)
  },
  [types.CACHE_PARTIES] (state, mutateObj) {
    Vue.set(state.cache, 'parties', mutateObj.data)
  },
  [types.CACHE_CAUCUSES] (state, mutateObj) {
    Vue.set(state.cache, 'caucuses', mutateObj.data)
  },
  [types.CACHE_GOV_AGENCIES] (state, mutateObj) {
    Vue.set(state.cache, 'gov_agencies', mutateObj.data)
  },
  [types.CACHE_LEGISLATIVE_STEPS] (state, mutateObj) {
    Vue.set(state.cache, 'legislative_steps', mutateObj.data)
  }
}

export default Object.assign(globalMutations, localMutations)
