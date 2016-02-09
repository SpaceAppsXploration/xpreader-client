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
      $('.main-content').empty()
        .html(new views.HomeView().render().el);
    },

    articles: function() {

      var articleFilter = new models.ArticleFilter();
      var articlePaginate = new models.Paginate();
      var articles = new collections.Articles({ filter: articleFilter, paginator: articlePaginate });

      // Adds the basic structure to the page.
      $('.main-content')
        .empty()
        .html(new views.ArticleView().render().el)
        .find('.article-content')
        .prepend(new views.ArticleFilterView({ model: articleFilter, collection: articles }).render().el)
        .append(new views.ArticlePaginationBoxView({ model: articlePaginate, collection: articles }).render().el);

      articles.loadArticles();
    },

    about: function() {
      $('.main-content').empty()
        .html(new views.AboutView().render().el);
    }
  });

  // requirejs exports
  // works like module.exports in Nodejs
  return {
    ArticlesRouter: ArticlesRouter
  };

});