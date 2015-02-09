var Backbone = require('backbone');
var $ = require('jquery');
var headerTemplate = require('./templates/header.handlebars');
var footerTemplate = require('./templates/alert-footer.handlebars');
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
  }

  
});