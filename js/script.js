(function ($, Drupal, drupalSettings, once) {
    Drupal.behaviors.transitionAjax = {
      attach: function (context, settings) {
        $(once('fadeout', document, context)).ajaxStart(function () {
          //console.log('hello');
        });
        $(once('fadein', document, context)).ajaxSuccess(function () {
          // Removed this to fix an IMCE bug... not sure what it's doing...
          //$.fn.fullpage.reBuild();
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
  })(jQuery, Drupal, drupalSettings, once);
