define([
  'jquery',
  'backbone',
  'handlebars',
  'text!../../templates/articles.html',
  'text!../../templates/article-list-item.html',
  'text!../../templates/article-pagination-box.html'
  ],
  function($, Backbone, Handlebars, articlesTemplate, articleListItemTemplate, articlePaginationBoxTemplate) {
    'use strict';

    // Views

    var ArticleView = Backbone.View.extend({
      tagName: 'div',
      className: 'articles',
      articlesTemplate: articlesTemplate,

      render: function() {
        Handlebars.registerPartial('articlePagination', articlePaginationBoxTemplate);
        var articlesTemplate = Handlebars.compile(this.articlesTemplate);

        this.$el.html(articlesTemplate());

        return this;
      }
    });

    var ArticleListView = Backbone.View.extend({
      // The big div that holds all the Articles
      tagName: 'div',
      className: 'article-list',

      // render function, it is called to display the view
      render: function() {
        // underscore library functional call to _(something).each() (like an optimized for loop)
        _(this.collection.models).each(function(article) {
          // model:article is passed to a new instance of ArticleListItemView
          this.$el.append(new ArticleListItemView({ model: article }).render().el);
        }, this);

        return this;
      }
    });

    /** TO-DO: Make the view to load keywords for each articles, see Collections.Articles.parse **/
        // see https://github.com/SpaceAppsXploration/xpreader-client/issues/7
    var ArticleListItemView = Backbone.View.extend({
      // The smaller divs that hold the single Article
      tagName: 'div',
      className: 'ui segment article-list-item',
      render: function() {
        // define a void template from the index's anchor
        // var articleTemplateContent = $('#article-template').text();
        // compile the template with Handlebars
        var articleTemplate = Handlebars.compile(articleListItemTemplate);
        // populate the template with model's attributes
        this.$el.html(articleTemplate(this.model.attributes));

        return this;
      }
    });

    /** TO-DO: Define a simple div with back/forward links for pagination **/
        // see https://github.com/SpaceAppsXploration/xpreader-client/issues/9
    var ArticlePaginationBoxView = Backbone.View.extend({

      render: function() {
        var paginationTemplate = Handlebars.compile(articlePaginationBoxTemplate);
        this.$el.html(paginationTemplate());

        return this;
      }

    });

    // requirejs exports
    // works like module.exports in Nodejs
    return {
      ArticleView: ArticleView,
      ArticleListView: ArticleListView,
      ArticleListItemView: ArticleListItemView,
      ArticlePaginationBoxView: ArticlePaginationBoxView
    };
});