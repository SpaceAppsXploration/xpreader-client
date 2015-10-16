define([
  'jquery',
  'backbone',
  'handlebars',
  'models',
  'text!../../templates/article-main.html',
  'text!../../templates/article-list-item.html',
  'text!../../templates/article-pagination-box.html',
  'text!../../templates/article-filters.html',
  'handlebarsHelper'
  ],
  function($, Backbone, Handlebars, models, articlesTemplate, articleListItemTemplate, articlePaginationBoxTemplate, articleFiltersTemplate) {
    'use strict';

    // Views

    var ArticleView = Backbone.View.extend({
      tagName: 'div',
      className: 'articles animated fadeIn',
      articlesTemplate: articlesTemplate,

      render: function() {
        Handlebars.registerPartial('articlePagination', articlePaginationBoxTemplate);
        var articlesTemplate = Handlebars.compile(this.articlesTemplate);

        this.$el.html(articlesTemplate());

        return this;
      }
    });

    var ArticleFilterView = Backbone.View.extend({
      tagName: 'div',
      className: 'article-filters',
      articleFiltersTemplate: articleFiltersTemplate,

      render: function() {
        var articleFilterTemplate = Handlebars.compile(articleFiltersTemplate);
        this.$el.html(articleFilterTemplate(this.model));

        return this;
      },

      events: {
        'click #filter-go': 'loadArticles'
      },

      updateModel: function() {
        this.model.set('type_of', this.$el.find('#type-select').val());
        this.model.set('sort', this.$el.find('#sort-select').val());
      },

      loadArticles: function() {
        this.updateModel();
        this.collection.loadArticles(this.model.buildUrl());
      }
    });

    var ArticleListView = Backbone.View.extend({
      // The big div that holds all the Articles
      tagName: 'div',
      className: 'article-list',

      // render function, it is called to display the view
      render: function() {
        // underscore library functional call to _(something).each() (like an optimized for loop)
        _(this.collection).each(function(article) {
          // model:article is passed to a new instance of ArticleListItemView

          var articleModel = new models.Article(article);

          this.$el.append(new ArticleListItemView({ model: articleModel }).render().el);
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
        var articleListItem = Handlebars.compile(articleListItemTemplate);
        // populate the template with model's attributes

        this.$el.html(articleListItem(this.model.toJSON()));

        return this;
      }
    });

    /** TO-DO: Define a simple div with back/forward links for pagination **/
        // see https://github.com/SpaceAppsXploration/xpreader-client/issues/9
    var ArticlePaginationBoxView = Backbone.View.extend({

      tagName: 'div',
      className: 'article-pagination-box',

      render: function() {
        var paginationTemplate = Handlebars.compile(articlePaginationBoxTemplate);
        this.$el.html(paginationTemplate());

        return this;
      },

      events: {
        'click #articles-next-page': function() {
          this.collection.loadArticles(this.model.get('next'));
        }
      }

    });

    // requirejs exports
    // works like module.exports in Nodejs
    return {
      ArticleView: ArticleView,
      ArticleFilterView: ArticleFilterView,
      ArticleListView: ArticleListView,
      ArticleListItemView: ArticleListItemView,
      ArticlePaginationBoxView: ArticlePaginationBoxView
    };
});