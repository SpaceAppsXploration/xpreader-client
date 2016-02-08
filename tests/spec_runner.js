
/** REQUIRE-JS config: library for handling modules in test environment **/
require.config({
  name: 'xpreader-client',
  baseUrl: '/',

  /* Shim used for non AMD compatible libraries. */
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    facebook: {
      exports: 'FB'
    }
  },
  paths: {
    /* Libraries */
    'jquery': '../static/libs/jquery/dist/jquery.min',
    'underscore': '../static/libs/underscore/underscore-min',
    'backbone': '../static/libs/backbone/backbone-min',

    // UI components and styles: http://semantic-ui.com
    'semantic-ui': '../static/libs/semantic-ui/dist/semantic.min',

    // Require-js plugin to load text files: https://github.com/requirejs/text
    'text': '../static/libs/text/text',

    // Handlebars.js: Minimal Templating on Steroids: http://handlebarsjs.com/
    'handlebars': '../static/libs/handlebars/handlebars.min',

    // Helper Libraries
    'stringParser': '../static/scripts/helper/stringParser',
    'handlebarsHelper': '../static/scripts/helper/handlebarsHelper',
    'twitter': '../static/scripts/helper/twitter',
    'facebook': '//connect.facebook.net/en_US/sdk',
    'fb': '../static/scripts/helper/fb',

    /* Project files */
    'router': '../static/scripts/router',
    'views': '../static/scripts/views/views',
    'models': '../static/scripts/models/models',
    'collections': '../static/scripts/models/collections',

    /* testing libs */
    'sinon': 'node_modules/sinon/lib/sinon',
    'sinonChai': 'node_modules/sinon-chai/lib/sinon-chai' //MIGHT need this later
  }
});

// can require needed test modules in the future here
// require([], function() {
    
// });
