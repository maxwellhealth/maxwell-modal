var Backbone = require('backbone');
var $ = require('jquery');
headerTemplate = require('./templates/iframe-header.handlebars');
Backbone.$ = $;
var Modal = require('./Modal');

module.exports = Modal.extend({
	dismissable: false,
	header: function(){
		return headerTemplate();
	},
	footer: function(){
		return null;
	}
});