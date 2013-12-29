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

        var init = function() {
            wi = -1;
            wf = -1;
            w = 0;
            words = [];
            angular.forEach(scope.page.text, function(paragraph, p) {
                var these_words = paragraph.split(/\s/g);
                words.push.apply(words, these_words);
                words.push('<br><br>');
            });
        };

        scope.at_page_beginning = function() {
            return (wi === 0);
        };
        scope.at_page_end = function() {
            return (wf >= words.length);
        }

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
        var display_page = function(direction) {
            dir = direction;
            if (dir === 'forward') {
                w = wi = wf + 1;
                next = incr;
                insert = 'append';
            } else if (dir === 'backward') {
                w = wf = wi - 1;
                next = decr;
                insert = 'prepend';
            }
            reflow_words();
        };

        // either reflows words forwards from wi or backwards from wf
        // such that they fit on the page
        var reflow_words = function() {
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

        // reflows words forward from wi
        // ex. used on window 'resize' event
        scope.reflow_words = function() {
            w = wi;
            dir = 'forward';
            next = incr;
            insert = 'append';
            reflow_words();
        };

        // scope.page_turn_dir is set by PageCtrl to trigger going forward/back
        scope.$watch(function() {
            return scope.page_turn_dir;
        }, function(newValue, oldValue) {
            if (newValue !== oldValue && newValue !== null) {
                display_page(newValue);
                scope.page_turn_dir = null;
            }
        });

        // if we get a new page, start out flowing forward
        scope.$watch(function() {
            return scope.page.page;
        }, function(newValue, oldValue) {
            if (newValue !== oldValue) {
                init();
                display_page('forward');
            }
        });

        init();
        display_page('forward');
    }

    return {
        link: link
    };
});

// myPageTurner
// draws the page turning arrows at the corners of the book image
// updates position as book image resizes with window
storytime.directive('myPageTurner', function($document) {
    function link(scope, element, attrs) {
        var $window = $(window);
        var $book_image = $('#book-image');
        var direction = "forward";
        // TODO how to go backward?
        if (attrs.myPageTurner == "backward") {
            direction = "backward";
        }
        var sync_position = function() {
            var h = $book_image.height();
            var w = $book_image.width();
            var pos = $book_image.position();
            element.css({
                'top': pos.top + h * 0.9,
                'left': pos.left + w * (direction == "forward" ? 0.93 : 0.07),
            });
        }

        sync_position();
        $window.on('resize', sync_position);
    }

    return {
        link: link
    };
});
