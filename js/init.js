// Minimal site init: Bootstrap tooltips only
(function($){
  $(function(){
    if ($.fn.tooltip) {
      $('[data-toggle="tooltip"]').tooltip();
    }
  });
})(jQuery);

