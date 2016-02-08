#Notes on testing setup for xpreader-client


##Libraries:
Mocha (test framework)
Chai (assertions)
Sinon (testing tools)
Sinon-Chai (syntactic sugar)
Testem (test-runner/auto-loader)


##Summary:
Uses Testem runner to auto-run all `*test.js` files in directory `tests`. Testem
will automatically rerun on test file changes. The Mocha+Chai combo is set for
BDD testing with "should"-style assertions. Its easy AND fun!

But we can configure for any testing style! If you can dream it, we can test it.

Note: Testem configuration is made in the file "testem.json" and in-browser tests are compiled 
dynamically from the mustache template "index.mustache".


##Instructions:
###Running Tests
Make sure you install the testing modules after updating `package.json`
> npm install

You will also need the provided `testem.json` config file and a directory in root called
`tests`.

Startup Testem from the command line:
```
> testem
```

and goto the specified browser address.

Then, write tests for your app modules!


###Writing Tests
This framework is based off the example found in this tutorial:

http://www.sitepoint.com/unit-testing-backbone-js-applications/

The process is quite straightforward. You use `require.js` to bring in
modules you want to test:

```
// moduleA_test.js
define(['backbone',
        'views',
        'models',
        'collections'], function(Backbone, views, models, collections) {

	describe('Module A Functionality', function() {
		...
```

 There are a couple sample test files to demonstrate
the basic flow. For an idea of the assertions at your disposal, you can visit:

http://chaijs.com/guide/styles

http://chaijs.com/api/bdd

Then save the test "module" in the `tests` directory with a `*test.js` extension
and if Testem is running it will auto-detect and run the tests!


###Stubbing and Mocking
For cases where we want to "control" or "fake" the behaviour of a third party library, 
API or even another component, this framework uses the Sinon library. Meanwhile the Sinon-Chai 
library makes the calling syntax easier. More in the links below.

Usage docs:

http://sinonjs.org

https://github.com/domenic/sinon-chai

A basic use of Sinon stubs is in "sample_test.js". The library has a lot more functionality!
Note: current project setup requires "sinon" to be included in a test file's "define" *if you 
are using any Sinon functions*.



