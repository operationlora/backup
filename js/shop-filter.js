// Minimal client-side filter for shop grid
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var input = document.getElementById('shop-filter-q');
    var grid = document.querySelector('.photorama-shop-grid');
    if (!input || !grid) return;

    var items = Array.prototype.slice.call(grid.querySelectorAll('.photorama-shop-item'));
    var empty = document.getElementById('shop-no-results');

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

