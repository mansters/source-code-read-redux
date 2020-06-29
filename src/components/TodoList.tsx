import React from 'react'
import Todo from './Todo'
import { ITodoItem, VisibilityFilterType } from '../actions/interface'
import { Dispatch } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { ConnectState } from '../interface'

export interface ITodoListProps {
  todos: ITodoItem[];
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoListProps> = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
)

const getVisibleTodos = (todos: ITodoItem[], filter: VisibilityFilterType) => {
  switch (filter) {
    case VisibilityFilterType.SHOW_ALL:
      return todos!
    case VisibilityFilterType.SHOW_COMPLETED:
      return todos!.filter(t => t.completed)
    case VisibilityFilterType.SHOW_ACTIVE:
      return todos!.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state: ConnectState) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleTodo: (id: number) => dispatch(toggleTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);