

// if (typeof define !== 'function') {
//     var define = require('amdefine')(module);
// }

define([], function() {
  // var chai = require('chai');
  // window.chai = chai
  // var should = chai.should();

  console.log("hi");
	describe('Smoke Test', function() {
		it('Should report a test succeeds', function() {
			// expect(0).to.equal(0);
      var test_obj = {greeting: 'hi'};
      should.exist(test_obj);
		})

    it('Should say hello', function() {
      var test_obj = {greeting: 'hi'};
      test_obj.greeting.should.equal('hi');

    })
	});

	// return {
	// 	name: "Smoketest"
	// };
});
