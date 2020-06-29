import { Reducer } from "@reduxjs/toolkit"
import { VisibilityFilterType, ActionType } from "../actions/interface"


const visibilityFilter: Reducer<VisibilityFilterType> = (state = VisibilityFilterType.SHOW_ALL, action) => {
  console.log(state);
  switch (action.type) {
    case ActionType.SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter