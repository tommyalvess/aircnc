// rootReducer.ts
import { combineReducers } from 'redux';
import socketReducer from '../services/socketReducer';

const rootReducer = combineReducers({
  socket: socketReducer,
  // Outros redutores do seu aplicativo, se houver
});

export default rootReducer;
