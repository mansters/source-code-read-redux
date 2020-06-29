import { ReducersMapObject, AnyAction, StateFromReducersMapObject } from "@reduxjs/toolkit";

function combineReducers<S, A extends AnyAction>(reducers: ReducersMapObject) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers: ReducersMapObject = {};

  for (let i = 0, len = reducerKeys.length; i < len; i++) {
    const key = reducerKeys[i];

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  const finalReducerKeys = Object.keys(finalReducers);

  return function combination(
    state: StateFromReducersMapObject<typeof reducers> = {},
    action: AnyAction,
  ) {
    let hasChange = false;
    const nextState: StateFromReducersMapObject<typeof reducers> = {};

    for (let i = 0, len = finalReducerKeys.length; i < len; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const prevStateForKey = state[key];
      const nextStateForKey = reducer(prevStateForKey, action);
      nextState[key] = nextStateForKey;

      if (nextStateForKey !== prevStateForKey) {
        hasChange = true;
      }
    }

    hasChange = hasChange || finalReducerKeys.length !== Object.keys(state).length;

    return hasChange ? nextState : state;
  }
}

export default combineReducers;