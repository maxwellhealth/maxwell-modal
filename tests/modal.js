var Modal = require('../src/Modal.js');
var $ = require('jquery');
global.jQuery = $;
global.$ = $;
require('../bower_components/bootstrap/dist/js/bootstrap.min.js');

describe('Modal', function() {
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
    var onHide = function() {
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

  var onYesModalCloseTests = [
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
      onYes: function(callback) {
        return callback(true);
      }
    }, {
      closes: false,
      condition: 'onYes returns a callback with false for its parameter',
      onYes: function(callback) {
        return callback(false);
      }
    }, {
      closes: true,
      condition: 'onYes is a function that returns true',
      onYes: function() {
        return true;
      }
    }, {
      closes: false,
      condition: 'onYes is a function that returns false',
      onYes: function() {
        return false;
      }
    }, {
      closes: false,
      condition: 'onYes has more than one parameter',
      onYes: function(one, two) {
        return one + two;
      }
    }
  ];
  onYesModalCloseTests.forEach(function(test) {
    var closes = test.closes ? '' : 'NOT';
    var vis = test.closes ? 'none' : 'block';
    it('should' + closes + ' ' + test.condition, function() {
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

  // TODO: Figure out how to consolidate the noButton and yesButton functions
  var onNoModalCloseTests = [
    {
      closes: true,
      condition: 'onNo is true',
      onNo: true
    }, {
      closes: false,
      condition: 'onNo is not set',
      onNo: null
    }, {
      closes: true,
      condition: 'onNo returns a callback with true for its parameter',
      onNo: function(callback) {
        return callback(true);
      }
    }, {
      closes: false,
      condition: 'onNo returns a callback with false for its parameter',
      onNo: function(callback) {
        return callback(false);
      }
    }, {
      closes: true,
      condition: 'onNo is a function that returns true',
      onNo: function() {
        return true;
      }
    }, {
      closes: false,
      condition: 'onNo is a function that returns false',
      onNo: function() {
        return false;
      }
    }, {
      closes: false,
      condition: 'onNo has more than one parameter',
      onNo: function(one, two) {
        return one + two;
      }
    }
  ];
  onNoModalCloseTests.forEach(function(test) {
    var closes = test.closes ? '' : 'NOT';
    var vis = test.closes ? 'none' : 'block';
    it('should' + closes + ' ' + test.condition, function() {
      var ContentModal = Modal.extend({
        dismissable: false,
        onNo: test.onNo
      });
      var contentView = new ContentModal();
      var body = contentView.render().el;
      expect($(body).find('.modal').css('display')).toBe('block');
      contentView.noButton();
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


  it('should close the modal', function() {
    var ContentModal = Modal.extend({});
    var contentView = new ContentModal();
    var body = contentView.render().el;
    contentView.closeModal();
    expect($(body).find('.modal').css('display')).toBe('none');
  });

  it('should close the modal and call the callback', function() {
    var ContentModal = Modal.extend({});
    var contentView = new ContentModal();
    var body = contentView.render().el;
    var called = false;
    contentView.closeModal(function() {
      called = true;
    });

    expect($(body).find('.modal').css('display')).toBe('none');
    expect(called).toBe(true);
  });
});