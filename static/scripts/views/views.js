define(['jquery', 'backbone', 'handlebars'], function($, Backbone, Handlebars) {
  'use strict';

  // Views
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
      var articleTemplateContent = $('#article-template').text();
      // compile the template with Handlebars
      var articleTemplate = Handlebars.compile(articleTemplateContent);
      // populate the template with model's attributes
      this.$el.html(articleTemplate(this.model.attributes));

      return this;
    }
  });

  /** TO-DO: Define a simple div with back/forward links for pagination **/
      // see https://github.com/SpaceAppsXploration/xpreader-client/issues/9
  var PaginationBox = Backbone.View.extend({
    tagName: 'div',

    render: function() {

    }

  });

  // requirejs exports
  // works like module.exports in Nodejs
  return {
    ArticleListView: ArticleListView,
    ArticleListItemView: ArticleListItemView
  }
});