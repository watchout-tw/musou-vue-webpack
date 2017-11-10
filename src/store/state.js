import globalState from 'common/src/store/state'

const localState = {
  cache: {
    reps: [],
    parties: [],
    caucuses: [],
    gov_agencies: [],
    legislative_steps: []
  }
}

export default Object.assign(globalState, localState)
