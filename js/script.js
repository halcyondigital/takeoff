(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.transitionAjax = {
      attach: function (context, settings) {
        $(document, context).once('fadeout').ajaxStart(function () {
          //console.log('hello');
        });
        $(document, context).once('fadein').ajaxSuccess(function () {
          $.fn.fullpage.reBuild();
        });
        //$('[data-toggle=popover]:not([data-popover-content])').popover({trigger: 'hover', placement: 'auto top'});
        $('body').popover({
          selector: '.has-popover',
          trigger: 'hover',
          placement: 'auto top',
          html: true,
          container: 'body',
          content: function() {
            var content = $(this).attr("data-popover-content");
            return $(content).children(".popover-body").html();
          }
        });
      }
    }
  })(jQuery, Drupal, drupalSettings);