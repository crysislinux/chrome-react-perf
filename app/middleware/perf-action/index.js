import { injectedActions, inject } from './inject';
import { passMessage } from './message';
export const PERF_ACTION = Symbol('PERF_ACTION');

/* eslint-disable no-unused-vars */
export default store => next => action => {
  const perfAction = action[PERF_ACTION];

  if (typeof perfAction === 'undefined') {
    return next(action);
  }

  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction[PERF_ACTION];
    return finalAction;
  }

  const [requestType, successType, failureType] = perfAction.types;
  let performAction;

  if (injectedActions.indexOf(requestType) !== -1) {
    performAction = inject(perfAction);
  } else {
    performAction = passMessage(perfAction);
  }

  next(actionWith({ type: requestType }));

  return performAction.then(
    response => next(actionWith({
      response,
      type: successType
    })),
    // TODO extract message from error object
    error => next(actionWith({
      type: failureType,
      error: 'Something bad happened'
    }))
  );
};
