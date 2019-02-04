import { combineReducers } from 'redux';

import { playerReducer } from './playerReducer';
import { authReducer } from './authReducer';
import { trackReducer } from './trackReducer';

export const Reducers = combineReducers({
  playerState: playerReducer,
  authState : authReducer,
  trackState : trackReducer
});