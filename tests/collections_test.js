/* 
  Sample tests for a Collection
  EXAMPLES USING SHOULD ASSERTIONS
    foo.should.be.a('string');
    foo.should.equal('bar');
    foo.should.have.length(3);
    beverages.should.have.property('tea').with.length(3);
*/
define(['backbone',
        'views',
        'models',
        'collections',
        'sinon'
        ], function(Backbone, views, models, collections, sinon) {

	describe('Module Test of Articles Collection', function() {

    beforeEach(function() {
      var articleFilter = new models.ArticleFilter();
      var articlePaginate = new models.Paginate();
      this.articles = new collections.Articles({ filter: articleFilter, paginator: articlePaginate });
    });

    it('Should be a Collection', function() {
      this.articles.should.be.an.instanceof(collections.Articles);
		});

    it('Should have a URL set', function() {
      this.articles.url().should.equal('http://hypermedia.projectchronos.eu/articles/v04/');
    });

	});

});
