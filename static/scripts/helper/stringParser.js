define(['underscore'], function(_) {
    'use strict';

    var convertToUrl = function(text) {
        /* Receives a text string and replaces urls with clickable urls. */

        var expression = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
        return text.replace(expression, "<a href='$1'>$1</a>");
    };

    var highlight = function(text, words) {
        /* Receives a text string and an array of words to be highlighted */

        _.each(words, function(word) {
            var expression = new RegExp('(' + word + ')', 'i');

            text = text.replace(expression, "<span class='highlight'>$1</span>");
        });

        return text;
    };

    return {
        convertToUrl: convertToUrl,
        highlight: highlight
    };

});