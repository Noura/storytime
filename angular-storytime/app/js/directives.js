'use strict';

// myTextFit
// displays text word by word so it fills up the page without overflowing
storytime.directive('myTextFit', function($document) {
    function link(scope, element, attrs) {

      // TODO make more variables private since no one else needs them
      scope.paragraphs = [];
      angular.forEach(scope.page.text, function(paragraph, i) {
        scope.paragraphs.push(paragraph.split(/\s/g));
      });

      scope.start_p = 0; // index in scope.paragraphs of first word on page
      scope.start_w = 0; // index in scope.paragraphs[scope.start_p] of
                         // first word on page
      scope.end_p = 0;   // index in scope.paragraphs of last word on page
      scope.end_w = 0;   // index in scope.paragraphs[scope.end_p] of
                         // last word on page

      // TODO combine display_page_forward and display_page_backward into
      // one function

      // TODO sometimes words get lost when changing pages. fix these off by one errors
      var display_page_forward = function() {
        console.log('display_page_forward with scope', scope);
        var $inner = $('<div></div>');
        var $last_word = null;
        element.html($inner);
        var p = scope.start_p;
        var w = scope.start_w;
        do {
          if (p < scope.paragraphs.length) {
            if (w < scope.paragraphs[p].length) {
              $last_word = $('<span> '+scope.paragraphs[p][w]+'</span>');
              w += 1;
            } else {
              p += 1;
              w = 0;
              $last_word = $('<br><br>');
            }
            $inner.append($last_word);
          }
        } while (   $inner.height() < element.height()
                 && p < scope.paragraphs.length);
        if ($last_word) {
          $last_word.remove();
        }
        scope.end_p = p;
        scope.end_w = Math.max(w-1, 0);
      };

      var display_page_backward = function() {
        console.log('display_page_backward with scope', scope);
        var $inner = $('<div></div>');
        var $first_word = null;
        element.html($inner);
        var p = scope.end_p;
        var w = scope.end_w - 1;
        if (w < 0) {
          w = 0;
          p -= 1;
        }
        if (p < 0) {
          return;
        }
        do {
          if (p >= 0) {
            if (w > 0) {
              $first_word = $('<span> '+scope.paragraphs[p][w]+'</span>');
              w -= 1;
            } else {
              p -= 1;
              if (p < 0) {
                break;
              }
              w = scope.paragraphs[p].length -1;
              $first_word = $('<br><br>');
            }
            $inner.prepend($first_word);
          }
        } while (   $inner.height() < element.height()
                 && p >= 0 );
        if ($first_word) {
          $first_word.remove();
        }
        scope.start_p = p;
        scope.start_w = w;
      };

      display_page_forward(); // display the first page upon initialization

      // listen for PageCtrl.nextPage() with the scope.go_to_next_page flag
      scope.$watch(function() {
        return scope.go_to_next_page;
      }, function(newValue, oldValue) {
        if (scope.go_to_next_page === true) {
          scope.start_w = scope.end_w;
          scope.start_p = scope.end_p;
          display_page_forward();
          scope.go_to_next_page = false;
        }
      });

      // listen for PageCtrl.prevPage() with the scope.go_to_prev_page flag
      scope.$watch(function() {
        return scope.go_to_prev_page;
      }, function(newValue, oldValue) {
        if (scope.go_to_prev_page === true) {
          scope.end_w = scope.start_w;
          scope.end_p = scope.start_p;
          display_page_backward();
          scope.go_to_prev_page = false;
        }
      });
    }

    return {
      link: link
    };

  // myPageTurner
  // draws the page turning arrows at the corners of the book image
  // updates position as book image resizes with window
  }).directive('myPageTurner', function($document) {
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
