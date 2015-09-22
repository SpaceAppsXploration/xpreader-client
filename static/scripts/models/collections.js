(function() {
  "use strict";

  var Articles = Backbone.Collection.extend({
    model: Article,
    url: 'http://hypermedia.projectchronos.eu/articles/?api=true',

    parse: function(response) {
      return response.articles;
    }
  });
})();
