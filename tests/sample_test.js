
define(['models', 'sinon'], function(models, sinon) {
  
	describe('Smoke Test', function() {
		it('Should report a test succeeds', function() {
      var test_obj = {greeting: 'hi'};
      should.exist(test_obj);
		});

    it('Should say hello', function() {
      var test_obj = {greeting: 'hi'};
      test_obj.greeting.should.equal('hi');

    });
	});

  describe('Example Test stubbing behaviour', function() {

    beforeEach(function() {
      this.article = new models.Article();
      this.save_stub = sinon.stub(this.article, "set");
    });

    afterEach(function() {
      this.save_stub.restore();
    });

    it("should intercept call to Model.set", function() {
      this.article.set('keywords',['stub','success!']);
      this.save_stub.should.have.been.calledOnce;
      this.article.get('keywords').should.have.length(0);
    })
  })
});
