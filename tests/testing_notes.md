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
BDD testing with "should"-style assertions.
But we can configure for any testing style! I you can dream it, we can test it.


##Instructions:
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

