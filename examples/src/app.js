var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
Backbone.$ = $;
window.jQuery = $;
window.$ = $;
require('bootstrap');
var MaxwellModal = require('../../index.js');
var headerTemplate = require('../../src/templates/header.handlebars');

//logging of events
function onShow() {
  console.log('onShow');
}
function onHide() {
  console.log('onHide');
}
function onYes() {
  console.log('onYes');
  return true;
}
function onNo() {
  console.log('onNo');
  return true;
}

function showModal() {
  var ContentModal = MaxwellModal.Modal.extend({
    content: 'fooo',
    onShow: onShow
  });
  var contentView = new ContentModal();
  $('body').append(contentView.render().el);
}

function showAdvancedModal() {
  var ContentModal = MaxwellModal.Modal.extend({
    //takes handlebars template!
    header: headerTemplate({
      title: 'FOO BAR BAZ'
    }),
    footer: $('<div><button class="btn">BAZ</button></div>').html(),
    //takes html!
    body: $('<div><button>FOO</button></div>').html(),
    onShow: onShow
  });

  var contentView = new ContentModal();
  $('body').append(contentView.render().el);
}

function showConfirmModal() {
  var ContentModal = MaxwellModal.ConfirmModal.extend({
    onShow: onShow,
    onHide: onHide,
    onYes: onYes,
    onNo: onNo,
    body: 'Are you sure you want to continue',
    title: 'Continue?',
    yesLabel: 'okey dokie'
  });
  var contentView = new ContentModal();
  $('body').append(contentView.render().el);
}

function showNonDismissableConfirmModal() {
  var ContentModal = MaxwellModal.ConfirmModal.extend({
    onShow: onShow,
    onHide: onHide,
    onYes: onYes,
    onNo: onNo,
    dismissable: false,
    body: 'Are you sure you want to continue',
    title: 'Continue?',
    yesLabel: 'okey dokie'
  });
  var contentView = new ContentModal();
  $('body').append(contentView.render().el);
}

function showAlertModal() {
  var ContentModal = MaxwellModal.AlertModal.extend({
    onShow: onShow,
    onHide: onHide,
    onYes: onYes,
    body: 'Your computer is about to explode.',
    title: 'Explosion?',
    yesLabel: 'OK'
  });
  var contentView = new ContentModal();
  $('body').append(contentView.render().el);
}

function showReactPoweredModal() {
  var reactBody = document.createElement('div');
  var foo = React.createClass({
    render: function() {
      return (
        React.createElement("div", null, "Hello ",this.props.name)
      );
    }
  });
  React.render(React.createElement(foo, {name: "John"}),reactBody);
  var ContentModal = MaxwellModal.AlertModal.extend({
    onShow: onShow,
    onHide: onHide,
    onYes: onYes,
    body: reactBody,
    title: 'Explosion?',
    yesLabel: 'OK'
  });
  var contentView = new ContentModal();
  $('body').append(contentView.render().el);
}

$('.showModal').click(showModal);
$('.showConfirmModal').click(showConfirmModal);
$('.showNonDismissableConfirmModal').click(showNonDismissableConfirmModal);
$('.showAdvancedModal').click(showAdvancedModal);
$('.showAlertModal').click(showAlertModal);
$('.showReactPoweredModal').click(showReactPoweredModal);