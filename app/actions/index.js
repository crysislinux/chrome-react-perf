/* global chrome */
import * as ActionTypes from './types';
// import makeActionCreator from '../utils/makeActionCreator';
import { PERF_ACTION } from '../middleware/perf-action';

export function connect() {
  return {
    [PERF_ACTION]: {
      types: [
        ActionTypes.CONNECT_REQUEST,
        ActionTypes.CONNECT_SUCCESS,
        ActionTypes.CONNECT_FAILURE
      ]
    }
  };
}

export function startRecord() {
  return {
    [PERF_ACTION]: {
      types: [
        ActionTypes.START_RECORD_REQUEST,
        ActionTypes.START_RECORD_SUCCESS,
        ActionTypes.START_RECORD_FAILURE
      ]
    }
  };
}

export function stopRecord() {
  return {
    [PERF_ACTION]: {
      types: [
        ActionTypes.STOP_RECORD_REQUEST,
        ActionTypes.STOP_RECORD_SUCCESS,
        ActionTypes.STOP_RECORD_FAILURE
      ]
    }
  };
}

export function getLastMeasurements() {
  return {
    [PERF_ACTION]: {
      types: [
        ActionTypes.GET_LAST_MEASUREMENTS_REQUEST,
        ActionTypes.GET_LAST_MEASUREMENTS_SUCCESS,
        ActionTypes.GET_LAST_MEASUREMENTS_FAILURE
      ]
    }
  };
}

export function printResult() {
  return {
    type: ActionTypes.PRINT_RESULT
  };
}

export function changeShowItems(items) {
  return {
    type: ActionTypes.CHANGE_SHOW_ITEMS,
    data: items
  };
}
