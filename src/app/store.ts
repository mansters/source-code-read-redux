import { ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import createStore from '../ReduxTools/createStore';


export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
