define(['backbone', 'models'], function(Backbone, models) {

  // see http://backbonejs.org/#Model-Collections
  var Articles = Backbone.Collection.extend({
    model: models.Article,

    // Backbone is pre-configured to sync with a RESTful API.
    // Simply create a new Collection with the url of your resource endpoint
    url: 'http://hypermedia.projectchronos.eu/articles/?api=true',

    parse: function(response) {
      // parse the 'articles' property in the response
      return response.articles;
      /** #TO-DO: parse the response to make it store article's keyword by
        fetching also the url found in response.keywords_url **/
    }
  });

  // requirejs exports
  // works like module.exports in Nodejs
  return {
    Articles: Articles
  }

});
