(function() {
  "use strict";

  // Models
  var Article = Backbone.Model.extend({

  });

  var Articles = Backbone.Collection.extend({
    model: Article,
    url: 'http://hypermedia.projectchronos.eu/articles/?api=true',

    parse: function(response) {
      return response.articles;
    }
  });

  // Router
  var ArticlesRouter = Backbone.Router.extend({
    routes: {
      'home': 'home',
      'articles': 'articles',
      'about': 'about'
    },
    home: function() {
      $('.main-content').empty();
      $('.main-content').append('<h1>Home Page</h1');
      // TODO: Add content
    },
    articles: function() {
      $('.main-content').empty();
      $('.main-content').append('<h1>Articles</h1');
      $('.main-content').append('<div class="articles"><div class="throbber-loader loader hidden"></div></div');
      $('.loader').removeClass('hidden');
      var articles = new Articles();
      articles.fetch(
        {
          success: function() {
            $('.loader').addClass('hidden');
            $('.articles').html(new ArticleListView({ collection: articles }).render().el);
          },
          error: function() {
            console.log('Error fetching articles.');
          }
        }
      );

    },
    about: function() {
      $('.main-content').empty();
      $('.main-content').append('<h1>About Project Chronos</h1>')
      // TODO: Add content
    }
  });

  var articlesRouter = new ArticlesRouter();
  Backbone.history.start();
  articlesRouter.navigate('home', { trigger: true });

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

  // var articles = new Articles();

  // articles.fetch({
  //   success: function() {

  //     // Compiles the template
  //     var articleTemplateContent= $('#article-template').text();
  //     var articleTemplate = Handlebars.compile(articleTemplateContent);

  //     articles.forEach(function(article) {
  //       console.log(articleTemplate(article.attributes));
  //       $('.articles').append(articleTemplate(article.attributes));
  //     });
  //   },
  //   error: function() {
  //     console.log('error');
  //   }
  // });

}());



