var Modal = require('../src/iframeModal.js');
var $ = require('jquery');
global.jQuery = $;
global.$ = $;
require('../bower_components/bootstrap/dist/js/bootstrap.min.js');

describe('iframe Modal', function () {
		var show = false;
		var hide = false;
		var testTitle = 'Test Title';
		var testBody = 'Test Body';

		var ContentModal = Modal.extend({
			body: testBody,
			title: testTitle,
			onShow: function(){show = true},
			onHide: function(){hide = true; expect(hide).toBe(true);}
		});
		var contentView = new ContentModal();
		var body = contentView.render().el;
	it('Should render the iframe with a close button in the header', function (){
		expect($(body).find('.modal-header button').text()).toBe('×');
	});
	it('Should render the iframe without a footer', function () {
		expect($(body).find('.modal-footer').html()).toBe(undefined);
	});
	it('Should have the dissmissable options set to false', function () {
		expect($(body).find('.modal').data('bs.modal').options.backdrop).toBe('static');
		expect($(body).find('.modal').data('bs.modal').options.keyboard).toBe(false);
	});
});