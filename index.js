import { registerRootComponent } from 'expo';

import React from 'react';
import App from './src/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
// import reducers from './src/reduxStore/reducers';
import reducer from './src/store';
// import { userLoggedIn } from './src/store/login';

const composeEnhancers = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);

/*const user = {
  id: 'sc10266',
  firstName: 'SC/2017/10266',
  username: 'Pabasara',
  role: 'student',
  courses: ['CSC2233', 'CSC2263', 'CSC2272']
};

store.dispatch(userLoggedIn(user));*/

const reduxApp = () => (
  <Provider store={ store }>
    <App />
  </Provider>
)

// registerRootComponent calls AppRegistry.registerComponent('main', () => reduxApp);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(reduxApp);
