define(['backbone',
        'views',
        'models',
        'collections'], function(Backbone, views, models, collections) {
  'use strict';

  /** Router **/
  var ArticlesRouter = Backbone.Router.extend({
    // Different routes for the single page
    routes: {
      'home': 'home',
      'articles': 'articles',
      'about': 'about'
    },

    home: function() {
      $('.main-content').empty().append('<h1>Home Page</h1>');
      // TODO: Add content
    },

    articles: function() {

      var articleFilter = new models.ArticleFilter();

      // Adds the basic structure to the page.
      $('.main-content')
        .empty()
        .html(new views.ArticleView().render().el)
        .find('.article-content')
        .prepend(new views.ArticleFilterView({ model: articleFilter }).render().el);

      var articles = new collections.Articles({ filter: articleFilter });

      articles.loadArticles();
    },

    about: function() {
      $('.main-content').empty().append('<h1>About Project Chronos</h1>');
      // TODO: Add content
    }
  });

  // requirejs exports
  // works like module.exports in Nodejs
  return {
    ArticlesRouter: ArticlesRouter
  };

});