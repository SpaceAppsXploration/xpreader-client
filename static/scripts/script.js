'use strict';

var Article = Backbone.Model.extend({

});

var Articles = Backbone.Collection.extend({
  model: Article,
  url: 'http://hypermedia.projectchronos.eu/articles/?api=true',

  parse: function(response) {
    return response.articles;
  }
});

var articles = new Articles();



articles.fetch({
  success: function() {

    // Compiles the template
    var articleTemplateContent= $('#article-template').text();
    var articleTemplate = Handlebars.compile(articleTemplateContent);

    articles.forEach(function(article) {
      console.log(articleTemplate(article.attributes));
      $('.articles').append(articleTemplate(article.attributes))
    })
  },
  error: function() {
    console.log('error')
  }
})