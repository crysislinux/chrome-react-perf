import * as ActionTypes from '../actions/types';
import { combineReducers } from 'redux';

function recording(state = false, action) {
  const { type } = action;

  switch (type) {
    case ActionTypes.START_RECORD_SUCCESS:
      return true;
    case ActionTypes.STOP_RECORD_SUCCESS:
      return false;
    default:
      return state;
  }
}

function measurements(state = [], action) {
  const { type } = action;

  switch (type) {
    case ActionTypes.GET_LAST_MEASUREMENTS_SUCCESS:
      return action.response;
    case ActionTypes.START_RECORD_SUCCESS:
      return [];
    default:
      return state;
  }
}

function showItems(state = { wasted: true, dom: false, inclusive: false,
  exclusive: false }, action) {
  const { type } = action;

  switch (type) {
    case ActionTypes.CHANGE_SHOW_ITEMS:
      return action.data;
    default:
      return state;
  }
}

function perfs(state = { wasted: [], dom: [], inclusive: [], exclusive: [] }, action) {
  const { type } = action;

  switch (type) {
    case ActionTypes.GET_PERF_DATA_SUCCESS:
      return action.response;
    case ActionTypes.START_RECORD_SUCCESS:
      return { wasted: [], dom: [], inclusive: [], exclusive: [] };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  recording,
  measurements,
  perfs,
  showItems,
});

export default rootReducer;
