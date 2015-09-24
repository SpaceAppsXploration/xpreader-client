define(['backbone', 'views', 'collections'], function(Backbone, views, collections) {
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
      $('.main-content').empty();
      $('.main-content').append('<h1>Home Page</h1>');
      // TODO: Add content
    },

    articles: function() {
      $('.main-content')
        .empty()
        .html(new views.ArticleView().render().el);

      $('.loader').removeClass('hidden');
      var articles = new collections.Articles();
      // async call to JSON API
      articles.fetch(
        {
          success: function() {
            // hides the loader element
            $('.loader').addClass('hidden');
            $('.article-pagination-box').removeClass('hidden');
            // instantiate the big div for articles passing in the collection
            $('.article-list').append(new views.ArticleListView({ collection: articles }).render().el);
          },
          error: function() {
            console.log('Error fetching articles.');
          }
        }
      );
    },

    about: function() {
      $('.main-content').empty();
      $('.main-content').append('<h1>About Project Chronos</h1>');
      // TODO: Add content
    }
  });

  // requirejs exports
  // works like module.exports in Nodejs
  return {
    ArticlesRouter: ArticlesRouter
  };

});