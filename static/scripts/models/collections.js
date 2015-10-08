define(['backbone',
        'views',
        'models'], function(Backbone, views, models) {

  // see http://backbonejs.org/#Model-Collections
  var Articles = Backbone.Collection.extend({
    model: models.Article,

    // Backbone is pre-configured to sync with a RESTful API.
    // Simply create a new Collection with the url of your resource endpoint
    url: function() {
      return this.instanceUrl || 'http://rdfendpoints.appspot.com/articles/v04/';
      //http://hypermedia.projectchronos.eu/articles/v04/
    },
    initialize: function(props) {
      this.instanceUrl = props.url;

      this.paginator = new models.Paginate({});
    },
    parse: function(response) {
      // parse the 'articles' property in the response
      return response;
      /** #TO-DO: parse the response to make it store article's keyword by
        fetching also the url found in response.keywords_url **/
    },
    loadKeywords: function () {
      _.each($('.article-list-item-keywords'), function(obj) {
        var keywordsUrl = $(obj).attr('keywords-url');
        $.ajax({
          url: keywordsUrl,
          dataType: 'json',
          success: function(json) {
            if (json.keywords && json.keywords[0]) {
              $(obj).removeClass('hidden').append(json.keywords[0].value);
            }
          },
          error: function() {
            console.log('Error retrieving keywords for ' + keywordsUrl);
          }
        });
      });
    },
    loadArticles: function(url) {
      if (url) {
        this.instanceUrl = url;
        console.log('after: '+ this.instanceUrl)
      }

      //Saves current context
      var $this = this;

      $('.main-content')
          .empty()
          .html(new views.ArticleView().render().el);

      $('.loader').removeClass('hidden');
      // async call to JSON API
      this.fetch(
        {
          success: function() {
            // hides the loader element
            $('.loader').addClass('hidden');
            // instantiate the big div for articles passing in the collection

            var articlesJson = $this.models[0].attributes.articles;
            var nextLink = $this.models[0].attributes.next;
            $('.article-content').append(new views.ArticleListView({ collection: articlesJson }).render().el);

            $this.paginator.set({next: nextLink});
            console.log($this.paginator.get('next'))

            var articlePaginationBoxView = new views.ArticlePaginationBoxView({ model: $this.paginator, collection: $this });
            $('.article-list').after(articlePaginationBoxView.render().el);

            //$this.loadKeywords();
          },
          error: function() {
            console.log('Error fetching articles.');
          }
        }
      );

      //$('#articles-next-page').on('click', load);
    },
    paginator: null
  });

  // requirejs exports
  // works like module.exports in Nodejs
  return {
    Articles: Articles
  };

});
