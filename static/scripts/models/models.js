define(['backbone', 'views'], function(Backbone, views) {
  'use strict';

  /*** Models **/

  /* Article model: */
  // a model that holds a single article object from the JSON API.
  var Article = Backbone.Model.extend({

    defaults: {
      keywords: []
    },

    url: '',

    initialize: function() {
      this.loadKeywords();
    },

    loadKeywords: function() {

      if (this.get('keywords_url')) {
        $.ajax({
          url: this.get('keywords_url'),
          dataType: 'json',
          success: function(json) {
            if (json.keywords && json.keywords[0]) {
              this.keywords = json.keywords[0].value.split(" ");
            }
          },
          error: function() {
            console.log('Error retrieving keywords.');
          }
        });
      }


    },

    updateAbstract: function() {
      if (this.abstract) {
        this.abstract = this.convertToUrl(this.abstract);
        this.abstract = this.highlightWords(this.abstract, this.keywords);
      }
    },

    convertToUrl: function(text) {
      /* Receives a text string and replaces urls with clickable urls. */
      if (text) {
        var expression = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
        return text.replace(expression, "<a href='$1'>$1</a>");
      }
      return '';
    },

    highlightWords: function(text, words) {
      /* Receives a text string and an array of words to be highlighted */

      if (text) {
        _.each(words, function (word) {
          var expression = new RegExp('(' + word + ')', 'i');

          text = text.replace(expression, "<span class='highlight'>$1</span>");

        });
        return text;
      }

      return '';
    }


  });

  /* Paginate model: */
  // a model to handle pagination.
  // Values of properties are the bookmark token of the previous and next page called from the JSON API
  // /articles/?bookmark=CjISLGoQZX5jaHJvbm9zdHJpcGxlc3IYCxILV2ViUmVzb3VyY2UYgICAwMjThAgMGAAgAA==
  // back = null > first page
  // back = bookmark > bookmarked page
  // forward = null > last page
  // page > page counter
  var Paginate = Backbone.Model.extend({
    back: null,
    next: null,
    page: 1
  });

  var ArticleFilter = Backbone.Model.extend({
    defaults: {
      base_url: 'http://hypermedia.projectchronos.eu/articles/v04/',
      type_of: 'tweet',
      query: '',
      sort: ''
    },

    initialize: function() {

      this.types = ['feed', 'tweet', 'media', 'link', 'pdf', 'paper', 'fb', 'movie'];

      this.typeOptions = [
        ['all', 'All'],
        ['feed', 'Feed'],
        ['tweet', 'Tweet'],
        ['media', 'Media'],
        ['link', 'Link'],
        ['pdf', 'PDF'],
        ['paper', 'Paper'],
        ['fb', 'Facebook'],
        ['movie', 'Movie']
      ];

      this.sortOptions = [
        ['recent', 'Recent'],
        ['oldest', 'Oldest']
      ];


    },

    validate: function(attrs, options) {
      return _.contains(this.types, attrs.type_of);
    },

    buildUrl: function() {
      var params = {};
      if (this.get('type_of') != 'all') {
        params.type_of = this.get('type_of');
      }

      // TODO: implement query and sort params
      return this.get('base_url') + '?' + $.param(params);
    },

  });

  // requirejs exports
  // works like module.exports in Nodejs
  return {
    Article: Article,
    Paginate: Paginate,
    ArticleFilter: ArticleFilter
  };

});