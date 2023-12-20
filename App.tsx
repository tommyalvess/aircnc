import { StatusBar } from 'native-base';
import Routes from './src/routes';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './src/services/rootReducer';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
      <StatusBar 
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
    </Provider>
  );
}
