var Backbone = require('backbone');
var $ = require('jquery');
var headerTemplate = require('./templates/header.handlebars');
var footerTemplate = require('./templates/confirm-footer.handlebars');
Backbone.$ = $;
var Modal = require('./Modal');

module.exports = Modal.extend({
  header : function(){
    return headerTemplate({
      title: this.title,
      dismissable: this.dismissable
    });
  },
  footer : function() {
    return footerTemplate({
      yesLabel: this.yesLabel,
      noLabel: this.noLabel
    });
  },
  getYesButton: function () {
    return this.$el.find('.yes-button');
  },
  getNoButton: function () {
    return this.$el.find('.no-button');
  }
});