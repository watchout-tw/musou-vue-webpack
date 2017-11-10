import commonActions from 'common/src/store/actions'
import * as types from './mutation-types'
import axios from 'axios'

const localActions = {
  cacheReps({ commit }) {
    axios.get('/c0ngress/reps').then(response => {
      commit(types.CACHE_REPS, {
        data: response.data.rows
      })
    })
  },
  cacheParties({ commit }) {
    axios.get('/c0ngress/parties').then(response => {
      commit(types.CACHE_PARTIES, {
        data: response.data.rows.map(row => Object.assign(row, {
          code: row.emblem,
          colors: [row.color]
        })) // FIXME: remove after db & API update
      })
    })
  },
  cacheCaucuses({ commit }) {
    axios.get('/c0ngress/caucuses').then(response => {
      commit(types.CACHE_CAUCUSES, {
        data: response.data.rows
      })
    })
  },
  cacheGovAgencies({ commit }) {
    axios.get('/c0ngress/gov_agencies').then(response => {
      commit(types.CACHE_GOV_AGENCIES, {
        data: response.data.rows
      })
    })
  },
  cacheLegislativeSteps({ commit }) {
    axios.get('/c0ngress/legislative_steps').then(response => {
      commit(types.CACHE_LEGISLATIVE_STEPS, {
        data: response.data.rows
      })
    })
  }
}

export default Object.assign(commonActions, localActions)
