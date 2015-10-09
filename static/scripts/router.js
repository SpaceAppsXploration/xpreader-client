define(['backbone',
        'views',
        'collections'], function(Backbone, views, collections) {
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
      var articles = new collections.Articles({});
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