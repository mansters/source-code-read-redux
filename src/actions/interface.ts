export enum ActionType {
  ADD_TODO = 'ADD_TODO',
  SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER',
  TOGGLE_TODO = 'TOGGLE_TODO',
}

export enum VisibilityFilterType {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE'
}

export interface ITodoItem {
  id: number;
  text: string;
  completed: boolean;
}