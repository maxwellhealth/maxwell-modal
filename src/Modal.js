var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');
var modalTemplate = require('./templates/modal.handlebars');
var bodyTemplate = require('./templates/body.handlebars');
var footerWrapperTemplate = require('./templates/footer-wrapper.handlebars');
Backbone.$ = $;
// require('bootstrap');

module.exports = Backbone.View.extend({
  /**
   * footer html
   * @type {DOM/Function}
   */
  footer: null,
  /**
   * header html
   * @type {DOM/Function}
   */
  header: null,
  /**
   * content html
   * @type {DOM/Function}
   */
  content: null,
  /**
   * body html
   * @type {DOM/Function}
   */
  body: null,
  /**
   * Function that executes on modal show
   * @type {function}
   */
  onShow: null,
    /**
   * Function that executes on modal hide
   * @type {function}
   */
  onHide: null,

  /**
   * whether the modal is able to be dismissed
   * @type {Boolean}
   */
  dismissable : true,
  /**
   * when using the confirm or alert modals, setting the title appropriately
   * @type {[type]}
   */
  title: null,
  yesLabel : 'Yes',
  /**
   * what occurs when the user clicks no
   * @type {function}
   * @returns {boolean} if false the hide function won't execute
   */
  onNo : null,
  noLabel : 'No',

   /**
   * what occurs when the user clicks yes/ok
   * @type {function}
   * @returns {boolean} if false the hide function won't execute
   */
  onYes : null,
  
  events : {
    'click .yes-button' : 'yesButton',
    'click .no-button' : 'noButton'
  },
  yesButton: function() {
    var success = true;
    
    if (this.onYes) {
      success = this.onYes();
    }

    if (success) {
      this.$el.find('.modal').modal('hide');
    }
  },

  /**
   * [noButton description]
   * @return {[type]} [description]
   */
  noButton: function() {
    var success = true;

    if (this.onNo) {
      success = this.onNo();
    }

    if (success) {
      this.$el.find('.modal').modal('hide');
    }
  },
  render : function() {
    var options  = {};
    var self = this;
    var header = this.header;
    var footer = this.footer;
    
    this.$el.html(modalTemplate());
    //replace all the content of the modal 
    if (this.content) {
      this.$el.find('.modal-content').html(this.content);  
    } else {
      //for closure scenarios 
      if (_.isFunction(this.header)) {
        header = this.header();
      }
      //for closure scenarios 
      if (_.isFunction(this.footer)) {
        footer = this.footer();
      }

      //append the header - this is driven by the configuration
      this.$el.find('.modal-content').append(header);
      //append the body wrapper
      this.$el.find('.modal-content').append(bodyTemplate());
      //append the body - this is driven by the configuration
      this.$el.find('.modal-body').append(this.body);
      //append the footer wrapper
      this.$el.find('.modal-content').append(footerWrapperTemplate());
      //append the footer - this is driven by the configuration
      this.$el.find('.modal-footer').append(footer);
    }
    
    if (this.dismissable === false) {
      options ={
        "backdrop" : "static",
        "keyboard" : false
      };
    }
    //apply the options and treat the modal as a modal
    this.$el.find('.modal').modal(options);
    
    // run the on show function
    if (this.onShow) {
      this.onShow();
    }
    // if its hidden run the on hide function and remove the view
    this.$el.find('.modal').on('hidden.bs.modal',function() {
      if (self.onHide) {
        self.onHide();
      }
      self.remove();
    });
    // show the modal
    this.$el.find('.modal').modal('show');
    return this;
  }
});