var Modal = require('../src/Modal.js');
var $ = require('jquery');
global.jQuery = $;
global.$ = $;
require('../bower_components/bootstrap/dist/js/bootstrap.min.js');

describe('Modal', function () {
  it('should render', function() {
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
  it('should not be dismissable but hides', function(done) {
    var show = false;
    var hide = false;
    var testTitle = 'Test Title';
    var testBody = 'Test Body';
    var testFooter = 'Test Footer';

    var ContentModal = Modal.extend({
      body: testBody,
      title: testTitle,
      dismissable: false,
      footer: testFooter,
      onShow: function() {show = true;},
      onHide: function() {hide = true;expect(hide).toBe(true); done();}
    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('button').length).toBe(0);
    expect($(body).find('h3').text()).toBe(testTitle);
    expect($(body).find('.modal-body').text()).toBe(testBody);
    expect($(body).find('.modal-footer').text()).toBe(testFooter);
    $(body).find('.modal').modal('hide');
  });
  it('should functions without callbacks', function() {
    var show = false;
    var hide = false;
    var testTitle = 'Test Title';
    var testBody = 'Test Body';
    var testFooter = 'Test Footer';

    var ContentModal = Modal.extend({
      body: testBody,
      title: testTitle,
      dismissable: false,
      footer: testFooter
    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('button').length).toBe(0);
    expect($(body).find('h3').text()).toBe(testTitle);
    expect($(body).find('.modal-body').text()).toBe(testBody);
    expect($(body).find('.modal-footer').text()).toBe(testFooter);
    $(body).find('.modal').modal('hide');
  });
  it('should have footer as function', function() {
    var show = false;
    var hide = false;
    var testTitle = 'Test Title';
    var testBody = 'Test Body';
    var testFooter = 'Test Footer';

    var ContentModal = Modal.extend({
      body: testBody,
      title: testTitle,
      dismissable: false,
      footer: function() {
        return 'foo';
      }
    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('button').length).toBe(0);
    expect($(body).find('h3').text()).toBe(testTitle);
    expect($(body).find('.modal-body').text()).toBe(testBody);
    expect($(body).find('.modal-footer').text()).toBe('foo');
    $(body).find('.modal').modal('hide');
  });
  it('should have content only', function() {
    var testBody = 'Test Body';

    var ContentModal = Modal.extend({
      content: testBody

    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('.modal-content').text()).toBe(testBody);
  });
  it('should have rando header', function() {
    var testBody = 'Test Body';

    var ContentModal = Modal.extend({
      header: testBody

    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('.modal-header').text()).toBe(testBody);
  });
});