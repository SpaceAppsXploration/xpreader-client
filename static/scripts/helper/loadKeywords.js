define(['underscore'], function(_) {

  var loadKeywords = function loadKeywords() {
    _.each($('.article-list-item-keywords'), function(obj) {
      var keywordsUrl = $(obj).attr('keywords-url');
      $.ajax({
        url: keywordsUrl,
        dataType: 'json',
        success: function(json) {
          if (json.keywords && json.keywords[0]) {
            $(obj).removeClass('hidden').append(json.keywords[0].value);
          }
        },
        error: function() {
          console.log('Error retrieving keywords for ' + keywordsUrl);
        }
      });
    });
  };

  return {
    loadKeywords: loadKeywords
  };

});