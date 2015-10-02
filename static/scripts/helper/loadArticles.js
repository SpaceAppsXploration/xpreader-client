define(['collections',
        'views',
        'loadKeywords'], function(collections, views, loadKeywords) {

  var load = function() {

    var nextUrl = $('#articles-next-page').attr('next-page');

    $('.main-content')
      .empty()
      .html(new views.ArticleView().render().el);

    var articles = new collections.Articles({ url: nextUrl });

    $('.loader').removeClass('hidden');

    // async call to JSON API
    articles.fetch(
      {
        success: function() {
          // hides the loader element
          $('.loader').addClass('hidden');
          $('.article-pagination-box').removeClass('hidden');
          // instantiate the big div for articles passing in the collection

          var articlesJson = articles.models[0].attributes.articles;
          var nextLink = articles.models[0].attributes.next;
          $('.article-list').append(new views.ArticleListView({ collection: articlesJson }).render().el);

          loadKeywords.loadKeywords();

          $('#articles-next-page').attr('next-page', nextLink);
        },
        error: function() {
          console.log('Error fetching articles.');
        }
      }
    );

    $('#articles-next-page').on('click', load);
  };

  return {
    load: load
  };

});

