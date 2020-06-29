import { VisibilityFilterType, ActionType } from "./interface"

let nextTodoId = 0

export const addTodo = (text: string) => ({
  type: ActionType.ADD_TODO,
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter: VisibilityFilterType) => ({
  type: ActionType.SET_VISIBILITY_FILTER,
  filter
})

export const toggleTodo = (id: number) => ({
  type: ActionType.TOGGLE_TODO,
  id
})
