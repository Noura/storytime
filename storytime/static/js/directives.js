'use strict';

// myBookColumns
// makes columns' height match book image
storytime.directive('myBookColumns', function($document) {
    function link(scope, element, attrs) {
        var h_percent = 0.74;
        var top_percent = 0.13;
        var $window = $(window);
        var $book_image = $('#book-image');
        var $columns = $('.column');

        var fit_with_book_image = function() {
          var h = $book_image.height();
          var w = $book_image.width();
          var pos = $book_image.position();
          $columns.css({
              'height': h * h_percent,
              'margin-top': h * top_percent,
          });
        };

        // TODO throttle these callbacks for performance
        $window.load(function() {
            fit_with_book_image();
            scope.reflow_words();
        });
        $window.resize(function() {
            fit_with_book_image();
            scope.reflow_words();
        });
    };

    return {
        link: link,
    }
});

// myTextFit
// displays text word by word so it fills up the page without overflowing
storytime.directive('myTextFit', function($document) {
    function link(scope, element, attrs) {

        var words, wi, wf, w, next, insert, dir;

        scope.set_direction = function(direction) {
            dir = direction;
        };
        var init = function() {
            words = [];
            angular.forEach(scope.page.text, function(paragraph, p) {
                var these_words = paragraph.split(/\s/g);
                words.push.apply(words, these_words);
                words.push('<br><br>');
            });
            if (dir === 'forward') {
                wf = -1;
                wi = -1;
                w = 0;
            } else if (dir === 'backward') {
                wi = words.length;
                wf = 0;
                w = 0;
            }
        };

        // say whether we are showing the very beginning or very end
        // used by PageCtrl to decide when to request a new page
        scope.at_page_beginning = function() {
            return (wi <= 0);
        };
        scope.at_page_end = function() {
            return (wf >= words.length - 1);
        }

        // range_check, incr, and decr are helper functions
        // to move over the words without going out of range
        var range_check = function(w) {
            // intentionally shadows w to test out if a new value is in range
            return w < words.length && w >= 0;
        };
        var incr = function() {
            if (range_check(w+1)) {
                w += 1;
                return true;
            } else {
                return false;
            }
        };
        var decr = function() {
            if (range_check(w-1)) {
                w -= 1;
                return true;
            } else {
                return false;
            }
        };

        // going forward or backward within the same story page
        var display_page = function() {
            if (dir === 'forward') {
                w = wi = wf + 1;
                next = incr;
                insert = 'append';
            } else if (dir === 'backward') {
                w = wf = wi - 1;
                next = decr;
                insert = 'prepend';
            }
            flow_words();
        };

        // reflows words forward from wi
        // ex. used on window 'resize' event
        scope.reflow_words = function() {
            w = wi;
            dir = 'forward';
            next = incr;
            insert = 'append';
            flow_words();
        };

        // either reflows words forwards from wi or backwards from wf
        // such that they fit on the page
        var flow_words = function() {
            var $inner = $('<div></div>');
            element.html($inner);
            var $word = null;
            var c = range_check(w);

            // clear leading empty lines
            // TODO put '<br><br>' into variable or template
            while (c && words[w] == '<br><br>') {
                c = next();
            }

            if (!c) {
                return;
            }

            do {
                $word = $('<span> ' + words[w] + '</span>');
                $inner[insert]($word);
                c = next();
            } while (c && $inner.height() <= element.height());

            if (dir === 'forward') {
                wf = c ? w - 2 : w;
                w = wi;
            } else if (dir === 'backward') {
                wi = c ? w + 1 : w;
                w = wf;
            }

            if ($inner.height() > element.height()) {
                $word.remove();
            }
        };

        // scope.page_turn_dir is set by PageCtrl to trigger going forward/back
        scope.$watch(function() {
            return scope.page_turn_dir;
        }, function(newValue, oldValue) {
            if (newValue !== oldValue && newValue !== null) {
                display_page();
                scope.page_turn_dir = null;
            }
        });

        // if we get a new page, start out flowing forward
        scope.$watch(function() {
            return scope.page.page;
        }, function(newValue, oldValue) {
            if (newValue !== oldValue) {
                init();
                display_page();
            }
        });

        dir = 'forward';
        init();
        display_page();
    }

    return {
        link: link
    };
});

// myPageTurner
// draws the page turning arrows at the corners of the book image
storytime.directive('myPageTurner', function($document) {
    function link(scope, element, attrs) {
        var $window = $(window);
        var $book_image = $('#book-image');
        console.assert(attrs.myPageTurner === 'forward'
            || attrs.myPageTurner === 'backward');
        var direction = attrs.myPageTurner;

        // updates position as book image resizes with window
        var sync_position = function() {
            var h = $book_image.height();
            var w = $book_image.width();
            var pos = $book_image.position();
            element.css({
                'top': pos.top + h * 0.9,
                'left': pos.left + w * (direction == "forward" ? 0.93 : 0.07),
            });
        };

        // don't show arrows when there are no more pages in that direction
        var hide_or_show = function() {
            if (   (
                    scope.at_page_end()                // if we are at the end
                    && scope.page.page === scope.page.pages // of the last page,
                    && direction === 'forward'         // hide forward arrow
                   )
                ||
                   (
                    scope.at_page_beginning()   // or if we are at beginning
                    && scope.page.page === 1         // of the first page,
                    && direction === 'backward' // hide back arrow
                   )
               ) {
                element.hide();
            } else {
                element.show();
            }
        };

        // TODO throttle callback for performance
        $window.on('resize', sync_position);

        scope.$watch(function() {
            return scope.page.page;
        }, function(newValue, oldValue) {
            if (newValue !== oldValue) {
                hide_or_show();
            }
        });

        var check;
        if (direction === 'forward') {
            check = 'at_page_beginning';
        } else if (direction === 'backward') {
            check = 'at_page_end';
        }
        scope.$watch(function() {
            return scope[check]();
        }, function(newValue, oldValue) {
            if (newValue !== oldValue) {
                hide_or_show();
            }
        });

        sync_position();
        hide_or_show();
    }

    return {
        link: link
    };
});


storytime.directive('myImageUploader', function($document) {
    function link(scope, element, attrs) {
        var $el = $(element);
        $el.dropzone({url: '/image/post'}).addClass('dropzone').html('Drag in images or click to browse');


        

    }

    return {
        link: link
    };
});
