var Modal = require('../src/ConfirmModal.js');
var $ = require('jquery');
global.jQuery = $;
global.$ = $;
require('../bower_components/bootstrap/dist/js/bootstrap.min.js');

describe('Confirm Modal', function () {

  it('should render', function() {
    var show = false;
    var hide = false;
    var testTitle = 'Test Title';
    var testBody = 'Test Body';

    var ContentModal = Modal.extend({
      body: testBody,
      title: testTitle,

      onShow: function() {show = true;},
      onHide: function() {hide = true;expect(hide).toBe(true);}
    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('h3').text()).toBe(testTitle);
    expect($(body).find('.modal-body').text()).toBe(testBody);
  });

  it('should execute yesFunction on click', function() {
    var show = false;
    var hide = false;
    var yes = false;
    var no = false;
    var testTitle = 'Test Title';
    var testBody = 'Test Body';

    var ContentModal = Modal.extend({
      body: testBody,
      title: testTitle,

      onShow: function() {show = true;},
      onYes: function() {
        yes = true;
        expect(no).toBe(false);
        expect(yes).toBe(true);
        return false;
      },
      onNo: function() {no = true;},
      onHide: function() {hide = true;expect(hide).toBe(true);}
    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('h3').text()).toBe(testTitle);
    expect($(body).find('.modal-body').text()).toBe(testBody);
    $(body).find('.yes-button').click();
  });

  it('should execute noFunction on click', function() {
    var show = false;
    var hide = false;
    var yes = false;
    var no = false;
    var testTitle = 'Test Title';
    var testBody = 'Test Body';

    var ContentModal = Modal.extend({
      body: testBody,
      title: testTitle,

      onShow: function() {show = true;},
      onYes: function() {
        yes = true;
        expect(yes).toBe(true);
        // done();
        return false;
      },
      onNo: function() {
        no = true;
        expect(yes).toBe(false);
        expect(no).toBe(true);

        // done();
        return false;
      },
      onHide: function() {hide = true;expect(hide).toBe(true);}
    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('h3').text()).toBe(testTitle);
    expect($(body).find('.modal-body').text()).toBe(testBody);
    $(body).find('.no-button').click();
  });

  it('should execute yes on click', function() {
    var testTitle = 'Test Title';
    var testBody = 'Test Body';
    var ContentModal = Modal.extend({
      body: testBody,
      title: testTitle
    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('h3').text()).toBe(testTitle);
    expect($(body).find('.modal-body').text()).toBe(testBody);
    $(body).find('.yes-button').click();
  });

  it('should no functions', function() {
    var show = false;
    var hide = false;
    var testTitle = 'Test Title';
    var testBody = 'Test Body';

    var ContentModal = Modal.extend({
      body: testBody,
      title: testTitle,
      onShow: function() {show = true;},
      onHide: function() {hide = true;expect(hide).toBe(true);}
    });
    var contentView = new ContentModal();
    var body = contentView.render().el;
    expect($(body).find('h3').text()).toBe(testTitle);
    expect($(body).find('.modal-body').text()).toBe(testBody);
    $(body).find('.no-button').click();
  });

  it('should have one yesButton and one noButton', function () {
    var ContentModal = Modal.extend({});
    var contentView = new ContentModal();
    contentView.render();
    expect(contentView.getYesButton().length).toBe(1);
    expect(contentView.getNoButton().length).toBe(1);
  });
});