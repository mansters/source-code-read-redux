import { ThunkAction, Action, createStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';


export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
