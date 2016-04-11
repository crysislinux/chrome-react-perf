(function pageWrapScript() {
  const s = document.createElement('script');
  s.type = 'text/javascript';

  s.src = 'http://localhost:3000/page.bundle.js';
  s.onload = function removeWrapScript() {
    this.parentNode.removeChild(this);
  };
  (document.head || document.documentElement).appendChild(s);
}());
