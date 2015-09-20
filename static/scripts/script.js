'use strict';

var Article = Backbone.Model.extend({

});

var ArticleList = new Backbone.Collection.extend({
  model: Article,

  parse: function(response) {
    return response.results
  },

  getArticles: function() {

  }
});