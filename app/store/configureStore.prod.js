import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import perfAction from '../middleware/perf-action';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, perfAction)
    )
  );

  return store;
}
