import { Reducer } from "@reduxjs/toolkit"
import { ITodoItem, ActionType } from "../actions/interface"

const todos: Reducer<ITodoItem[]> = (state = [], action) => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case ActionType.TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
}

export default todos