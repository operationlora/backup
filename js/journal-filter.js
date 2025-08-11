// Simple client-side filter for Journal index
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var input = document.getElementById('journal-filter-q');
    var list = document.querySelector('.section--postsWrapper .blockGroup-list');
    if (!input || !list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll('.block'));
    var empty = document.getElementById('journal-no-results');

    function norm(s) { return (s || '').toString().toLowerCase().trim(); }

    function applyFilter() {
      var q = norm(input.value);
      var shown = 0;
      items.forEach(function (el) {
        var title = norm(el.getAttribute('data-title'));
        var cat = norm(el.getAttribute('data-category'));
        var text = title + ' ' + cat;
        var match = !q || text.indexOf(q) >= 0;
        el.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      if (empty) empty.style.display = shown ? 'none' : '';
    }

    input.addEventListener('input', applyFilter);
  });
})();

