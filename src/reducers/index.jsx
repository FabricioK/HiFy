import { combineReducers } from 'redux';

import { playerReducer } from './playerReducer';
import { authReducer } from './authReducer';
import { trackReducer } from './trackReducer';
import { artistReducer } from './artistReducer';
import { albumReducer } from './albumReducer';

export const Reducers = combineReducers({
  playerState: playerReducer,
  authState: authReducer,
  trackState: trackReducer,
  artistState: artistReducer,
  albumState: albumReducer,
});