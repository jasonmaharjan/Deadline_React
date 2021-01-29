import { createStore , applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import {persistStore} from 'redux-persist';
import rootReducer from './root-reducer';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

/*if (process.env.NODE_ENV === 'development') { // create-react-app sets to development by default
   middlewares.push(logger);
}*/

middlewares.push(logger);

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
