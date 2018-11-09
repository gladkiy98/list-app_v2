import { TEST } from '../constants/localeSet';

export default function testReducer(state = { list: [] }, action) {
  switch (action.type) {
    case TEST:
      return { ...state, list: action.list }
    default:
      return state
  }
}
