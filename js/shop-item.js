// Tiny dependency-free script for product image swapping
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var main = document.getElementById('product-main-image');
    if (!main) return;

    var thumbs = Array.prototype.slice.call(document.querySelectorAll('.product-thumb'));
    if (!thumbs.length) return;

    function setActive(idx) {
      thumbs.forEach(function (btn, i) {
        if (i === idx) btn.classList.add('is-active');
        else btn.classList.remove('is-active');
      });
    }

    function swapTo(idx) {
      var btn = thumbs[idx];
      if (!btn) return;
      var src = btn.getAttribute('data-src');
      if (!src || main.src === src) return;

      // Preload new image for smoother swap
      var img = new Image();
      img.onload = function () {
        main.src = src;
        setActive(idx);
      };
      img.src = src;
    }

    thumbs.forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        swapTo(idx);
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          swapTo(idx);
        }
      });
    });

    // Optional keyboard navigation on the main image
    var current = thumbs.findIndex(function (b) { return b.classList.contains('is-active'); });
    if (current < 0) current = 0;

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var idx = thumbs.findIndex(function (b) { return b.classList.contains('is-active'); });
      if (idx < 0) idx = 0;
      if (e.key === 'ArrowLeft') idx = (idx - 1 + thumbs.length) % thumbs.length;
      else idx = (idx + 1) % thumbs.length;
      swapTo(idx);
    });
  });
})();

