define(['backbone', 'models'], function(Backbone, models) {

  // see http://backbonejs.org/#Model-Collections
  var Articles = Backbone.Collection.extend({
    model: models.Article,

    // Backbone is pre-configured to sync with a RESTful API.
    // Simply create a new Collection with the url of your resource endpoint
    url: function() {
      return this.instanceUrl || 'http://hypermedia.projectchronos.eu/articles/v04/';
    },
    initialize: function(props) {
      this.instanceUrl = props.url;
    },
    parse: function(response) {
      // parse the 'articles' property in the response
      return response;
      /** #TO-DO: parse the response to make it store article's keyword by
        fetching also the url found in response.keywords_url **/
    }
  });

  // requirejs exports
  // works like module.exports in Nodejs
  return {
    Articles: Articles
  };

});
