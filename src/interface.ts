import { ITodoItem, VisibilityFilterType } from "./actions/interface";

export interface ConnectState {
  todos: ITodoItem[];
  visibilityFilter: VisibilityFilterType;
}