/* eslint-disable no-console */
let consoleBak;

export function mock(callbacks) {
  if (consoleBak) {
    // Can only mock console once before restore it.
    return false;
  }

  consoleBak = {};

  for (const property in callbacks) {
    if (callbacks.hasOwnProperty(property)) {
      consoleBak[property] = console[property];
      console[property] = callbacks[property];
    }
  }

  return true;
}

export function restore() {
  if (!consoleBak) {
    return;
  }

  for (const property in consoleBak) {
    if (consoleBak.hasOwnProperty(property)) {
      console[property] = consoleBak[property];
    }
  }
  consoleBak = null;
}

export default {
  mock,
  restore
};
