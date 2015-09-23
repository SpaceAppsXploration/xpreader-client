define(['backbone', 'models'], function(Backbone, models) {

  var Articles = Backbone.Collection.extend({
    model: models.Article,
    url: 'http://hypermedia.projectchronos.eu/articles/?api=true',

    parse: function(response) {
      return response.articles;
    }
  });

  return {
    Articles: Articles
  }

});
