var Modal = require('../src/ConfirmModal.js');
var $ = require('jquery');
global.jQuery = $;
global.$ = $;
require('../bower_components/bootstrap/dist/js/bootstrap.min.js');

describe('foo', function () {
  it('description', function() {
    var show = false;
    var hide = false;
    var testTitle = 'Test Title';
    var testBody = 'Test Body';
    var testFooter = 'Test Footer';

    var ContentModal = Modal.extend({
      body: testBody,
      title: testTitle,

      footer: testFooter,
      onShow: function() {show = true;},
      onHide: function() {hide = true;expect(hide).toBe(true);}
    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('button').text()).toBe('×');
    expect($(body).find('h3').text()).toBe(testTitle);
    expect($(body).find('.modal-body').text()).toBe(testBody);
    expect($(body).find('.modal-footer').text()).toBe(testFooter);

  });
});