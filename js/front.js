(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.fullPage = {
        attach: function (context, settings) {
            var title = document.title;
            // check if fullpage is active and initialise if not
            if(!$('html').hasClass('fp-enabled')){
                $('#fullpage', context).once('fullpage').fullpage({
                    anchors: drupalSettings.fullPage.sections,  // bring in section labels from Page Manager
                    menu: '.navbar-nav',
                    paddingTop: '50px',
                    animateAnchor: false,
                    sectionsDestination: 'top',
                    responsiveWidth: '768',
                    scrollOverflow: true,
                    slideSelector: '.section-slide',
                    slidesNavigation: true,
                    onLeave: function(index, nextIndex, direction){
                        var leavingSection = $(this);

                        // attempt to lazy load following slide
                        if(direction == 'down'){
                          lazyLoad(nextIndex);
                        }
                        if(direction == 'up'){
                          lazyLoad(nextIndex - 2);
                        }

                        // fade in extra nav options when moving off 1st slide
                        if(index == 1 && direction =='down'){
                            $('.navbar.navbar-fixed-top').addClass('deep');
                        }
                        // fade out extra nav options when returning to 1st slide
                        else if(index == 2 && direction == 'up'){
                            $('.navbar.navbar-fixed-top').removeClass('deep');
                        }

                        // check if next slide is the child of a menu item, determined by a '-' seperator
                        var incoming = drupalSettings.fullPage.sections[nextIndex-1];  // get anchor name for incoming slide instead of index number
                        var parent = incoming.split('-');
                        $(".navbar-nav").find('a').removeClass('active-child');
                        $(".navbar-nav").find("a[data-menuanchor='" + parent[0] + "']").addClass('active-child');

                        // change page title based on next slide
                        if(nextIndex == 1) {
                            document.title = title;
                        } else {
                            document.title = parent[0].replace(/\b\w/g, l => l.toUpperCase()) + " / Halcyon Digital";
                        }
                    },
                    afterRender: function(){
                        $('.section-slide').css('padding-top', '50px');
                        $('.section-slide').closest('.section').css('padding-top','0');
                        animateHeadline($('h3.changing-headline'));
                        //$('.view-rental-items').trigger('RefreshView');
                    }
                });
            }

            /**
            * Sets the value for the given attribute from the `data-` attribute with the same suffix
            * ie: data-srcset ==> srcset  |  data-src ==> src
            */
            function setSrc(element, attribute){
              element
                .attr(attribute, element.data(attribute))
                .removeAttr('data-' + attribute);
            }

            // Lazy loads image, video and audio elements.
            function lazyLoad(index){
              var panel = $("#fullpage section").eq(index);
              var element;

              panel.find('img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]').each(function(){
                element = $(this);

                $.each(['src', 'srcset'], function(index, type){
                    var attribute = element.attr('data-' + type);
                    if(typeof attribute !== 'undefined' && attribute){
                        setSrc(element, type);
                    }
                });

                if(element.is('source')){
                    var typeToPlay = element.closest('video').length ? 'video' : 'audio';
                    element.closest(typeToPlay).get(0).load();
                }
              });
            }

            var animationDelay = 2500;
            function animateHeadline($headlines) {
                $headlines.each(function(){
                    var headline = $(this);
                        //trigger animation
                        setTimeout(function(){ hideWord( headline.find('.is-visible') ) }, animationDelay);
                        //other checks here ...
                });
            }
            function hideWord($word) {
                var nextWord = takeNext($word);
                switchWord($word, nextWord);
                setTimeout(function(){ hideWord(nextWord) }, animationDelay);
             }

            function takeNext($word) {
                return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
             }

            function switchWord($oldWord, $newWord) {
                $oldWord.removeClass('is-visible').addClass('is-hidden');
                $newWord.removeClass('is-hidden').addClass('is-visible');
             }
        }
    };
})(jQuery, Drupal, drupalSettings);
