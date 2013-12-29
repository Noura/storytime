'use strict';

storytime.directive('myTextFit', function($document) {

    function link(scope, element, attrs) {

      var display_page = function() {
        var $inner = $('<div></div>');
        var $last_word = null;
        element.html($inner);
        if (scope.start_p == undefined) {
          scope.start_p = 0;
          scope.start_w = 0;
        }
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
              $last_word = ('<br><br>');
            }
            $inner.append($last_word);
          }
        } while (   $inner.height() < element.height()
                 && p < scope.paragraphs.length);
        if ($last_word) {
          $last_word.remove();
        }
        scope.end_p = p;
        scope.end_w = w + 1;
      }

      display_page();

      scope.$watch(scope.start_p, display_page);
    }

    return {
      link: link
    };
  });
