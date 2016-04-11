export default function makeActionCreator(type, ...argNames) {
  return function _makeActionCreator(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}
