import './contentScript';

if (process.env.NODE_ENV === 'production') {
  require('./pageScriptWrap.prod');
} else {
  require('./pageScriptWrap.dev');
}
