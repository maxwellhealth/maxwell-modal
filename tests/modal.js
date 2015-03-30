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
      onShow: function() {
        show = true;
      },
      onHide: function() {
        hide = true;
        expect(hide).toBe(true);
      }
    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('button').text()).toBe('×');
    expect($(body).find('h3').text()).toBe(testTitle);
    expect($(body).find('.modal-body').text()).toBe(testBody);
    expect($(body).find('.modal-footer').text()).toBe(testFooter);
  });

  it('should not be dismissable but hides', function() {
    var show = false;
    var testTitle = 'Test Title';
    var testBody = 'Test Body';
    var testFooter = 'Test Footer';
    var onHide = function () {
      onHide.called = true;
    };
    var ContentModal = Modal.extend({
      body: testBody,
      title: testTitle,
      dismissable: false,
      footer: testFooter,
      onShow: function() {
        show = true;
      },
      onHide: onHide
    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('button').length).toBe(0);
    expect($(body).find('h3').text()).toBe(testTitle);
    expect($(body).find('.modal-body').text()).toBe(testBody);
    expect($(body).find('.modal-footer').text()).toBe(testFooter);
    $(body).find('.modal').modal('hide');
    expect(onHide.called).toBe(true);
  });

  it('should function without callbacks', function() {
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

    // This line is here to increase code coverage because there is an
    // onHide hook attached to the modal('hide') event that checks whether
    // the onHide function should be fired
    $(body).find('.modal').modal('hide');
  });

  var modalCloseTests = [
    {
      closes: true,
      condition: 'onYes is true',
      onYes: true
    }, {
      closes: false,
      condition: 'onYes is not set',
      onYes: null
    }, {
      closes: true,
      condition: 'onYes returns a callback with true for its parameter',
      onYes: function (callback) {
        return callback(true);
      }
    }, {
      closes: false,
      condition: 'onYes returns a callback with false for its parameter',
      onYes: function (callback) {
        return callback(false);
      }
    }, {
      closes: true,
      condition: 'onYes is a function that returns true',
      onYes: function () {
        return true;
      }
    }, {
      closes: false,
      condition: 'onYes is a function that returns false',
      onYes: function () {
        return false;
      }
    }, {
      closes: false,
      condition: 'onYes has more than one parameter',
      onYes: function (one, two) {
        return one + two;
      }
    }
  ];
  modalCloseTests.forEach(function (test) {
    var closes = test.closes ? '' : 'NOT';
    var vis = test.closes ? 'none' : 'block';
    it('should' + closes + ' ' + test.condition, function () {
      var ContentModal = Modal.extend({
        dismissable: false,
        onYes: test.onYes
      });
      var contentView = new ContentModal();
      var body = contentView.render().el;
      expect($(body).find('.modal').css('display')).toBe('block');
      contentView.yesButton();
      expect($(body).find('.modal').css('display')).toBe(vis);
    });
  });

  it('should have footer as function', function() {
    var testTitle = 'Test Title';
    var testBody = 'Test Body';

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

  it('should have a header', function() {
    var testHeader = 'Test Header';
    var ContentModal = Modal.extend({
      header: testHeader

    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('.modal-header').text()).toBe(testHeader);
  });
});