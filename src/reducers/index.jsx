import { combineReducers } from 'redux';

import { playerReducer } from './playerReducer';
import { authReducer } from './authReducer';

export const Reducers = combineReducers({
  playerState: playerReducer,
  authState : authReducer
});