define(['jquery', 'backbone', 'handlebars'], function($, Backbone, Handlebars) {
  'use strict';

  // Views
  var ArticleListView = Backbone.View.extend({
    tagName: 'div',
    className: 'article-list',
    render: function() {
      _(this.collection.models).each(function(article) {
        this.$el.append(new ArticleListItemView({ model: article }).render().el);
      }, this);
      return this;
    }
  });

  var ArticleListItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'ui segment article-list-item',
    render: function() {
      var articleTemplateContent = $('#article-template').text();
      var articleTemplate = Handlebars.compile(articleTemplateContent);
      this.$el.html(articleTemplate(this.model.attributes));
      return this;
    }
  });

  return {
    ArticleListView: ArticleListView,
    ArticleListItemView: ArticleListItemView
  }
});