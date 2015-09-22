(function() {

  require.config({
    name: 'xpreader-client',
    baseUrl: 'static/scripts',

    // Shim used for non AMD compatible libraries.
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

      // Libraries
      'jquery': '../libs/jquery/dist/jquery.min',
      'underscore': '../libs/underscore/underscore-min',
      'backbone': '../libs/backbone/backbone-min',
      'semantic-ui': '../libs/semantic-ui/dist/semantic.min',
      'handlebars': '../libs/handlebars/handlebars.min',

      // Project files
      'router': 'router',
      'views': 'views/views',
      'models': 'models/models',
      'collections': 'models/collections'
    }
  })

  require(['router'], function(router) {
    var articlesRouter = new router.ArticlesRouter();
    Backbone.history.start();
    articlesRouter.navigate('home', { trigger: true });
  });

}());