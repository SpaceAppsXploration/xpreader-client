define(['backbone',
        'views',
        'models',
        'semantic-ui',
        'twitter',
        'fb'], function(Backbone, views, models, stringParser) {

  // see http://backbonejs.org/#Model-Collections
  var Articles = Backbone.Collection.extend({
    model: models.Article,

    // Backbone is pre-configured to sync with a RESTful API.
    // Simply create a new Collection with the url of your resource endpoint
    url: function() {
      return this.instanceUrl || 'http://hypermedia.projectchronos.eu/articles/v04/';
    },

    initialize: function(props) {
      this.instanceUrl = props.url;

      this.filter = props.filter;

      this.paginator = props.paginator;
    },

    parse: function(response) {
      // parse the 'articles' property in the response
      response.articles = _.filter (response.articles, function(res){
        return res.title !== '';
      });
      return response;

      /* TODO: Check if all articles in the response are filtered leaving no articles in the response.

      /* TODO: parse the response to make it store article's keyword by
        fetching also the url found in response.keywords_url */
    },

    loadArticles: function(url) {
      if (url) {
        this.instanceUrl = url;
      }

      //Saves current context
      var $this = this;

      $('.article-list').remove();

      $(document).ajaxStop(function(){
        if ($('.fb-post').not("[fb-xfbml-state*='rendered']")) {
          window.fbAsyncInit();
        }

        twttr.widgets.load();
      });

      $('.loader').removeClass('hidden');
      // async call to JSON API
      $this.fetch(
        {
          success: function(collection, response) {
            // hides the loader element
            $('.loader').addClass('hidden');
            // instantiate the big div for articles passing in the collection
            if (response.articles.length) {
              $('.article-pagination-box').removeClass('hidden').before(new views.ArticleListView({ collection: response.articles }).render().el);
            } else {
              $('.article-pagination-box').addClass('hidden').before('<div class="article-list"><p>No content found.</p></div>');
            }

            $('select.dropdown').dropdown();

            $this.paginator.set('next', response.next);

            twttr.widgets.load();
            window.fbAsyncInit();
          },
          error: function() {
            console.log('Error fetching articles.');
          }
        }
      );

    }
  });

  // requirejs exports
  // works like module.exports in Nodejs
  return {
    Articles: Articles
  };

});
