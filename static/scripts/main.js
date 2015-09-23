(function() {

  /** REQUIRE-JS config: library for handling modules **/
  require.config({
    name: 'xpreader-client',
    baseUrl: 'static/scripts',

    /* Shim used for non AMD compatible libraries. */
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      }
    },
    paths: {

      /* Libraries */
      'jquery': '../libs/jquery/dist/jquery.min',
      'underscore': '../libs/underscore/underscore-min',
      'backbone': '../libs/backbone/backbone-min',

      // UI components and styles: http://semantic-ui.com
      'semantic-ui': '../libs/semantic-ui/dist/semantic.min',

      // Require-js plugin to load text files: https://github.com/requirejs/text
      'text': '../libs/text/text',

      // Handlebars.js: Minimal Templating on Steroids: http://handlebarsjs.com/
      'handlebars': '../libs/handlebars/handlebars.min',

      /* Project files */
      'router': 'router',
      'views': 'views/views',
      'models': 'models/models',
      'collections': 'models/collections'
    }
  });

  require(['router'], function(router) {
    var articlesRouter = new router.ArticlesRouter();
    Backbone.history.start();
    articlesRouter.navigate('home', { trigger: true });
  });

}());