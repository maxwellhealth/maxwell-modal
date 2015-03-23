#Maxwell Modal

##Bootstrap and Backbone Powered Modal Views

[![Build Status](https://travis-ci.org/maxwellhealth/maxwell-modal.svg?branch=master)](https://travis-ci.org/maxwellhealth/maxwell-modal)

[![Coverage Status](https://coveralls.io/repos/maxwellhealth/maxwell-modal/badge.svg?branch=master)](https://coveralls.io/r/maxwellhealth/maxwell-modal?branch=master)

##Install

`npm install maxwell-modal`


##Usage

There are three types of modals available

### Modal

This is the basic modal. It has two types of configurations

* Content
* Header, Body, Footer

```json
{  /**
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
  onYes : null
}
```
####Content

If the content property is present it will operate in content mode.

```javascript
var ContentModal = MaxwellModal.Modal.extend({
  content: 'fooo',
  onShow: onShow
});
  var contentView = new ContentModal();
  $('body').append(contentView.render().el);
```
This will create a modal that contains the word foo and nothing else.

Content can take a DOM element, rendered html, rendered backbone view, handlebars template output or a function.


####Header,Body,Footer
Header,Body,Footer works similarly except it uses 3 different views for each section of the bootstrap modal.

```javascript
var ContentModal = MaxwellModal.Modal.extend({
    //takes handlebars template!
    header: headerTemplate({
      title: 'FOO BAR BAZ'
    }),
    //takes html!
    body: $('<div><button>FOO</button></div>').html(),
    onShow: onShow
  });

  var contentView = new ContentModal();
  $('body').append(contentView.render().el);
```
Note the handlebars template for the header, rendered html for the body.
These could take a rendered backbone view.


###Confirm Modal

A replacement for the confirm box

####Options

```json
{ /**
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
  onYes : null
}
```

```javascript
 var ContentModal = MaxwellModal.ConfirmModal.extend({
    onShow: onShow,
    onHide: onHide,
    onYes: onYes,
    onNo: onNo,
    body: 'Are you sure you want to continue',
    title: 'Continue?',
    yesLabel: 'okey dokie'
  });
  ```
This produces a modal with two buttons, yes and no. their labels are configurable as well as what occurs on yes and on no.

###Alert Modal

A replacement for the alert box

####Options

```json
{ /**
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
   * what occurs when the user clicks yes/ok
   * @type {function}
   * @returns {boolean} if false the hide function won't execute
   */
  onYes : null
}
```

```
  var ContentModal = MaxwellModal.AlertModal.extend({
    onShow: onShow,
    onHide: onHide,
    onYes: onYes,
    body: 'Your computer is about to explode.',
    title: 'Explosion?',
    yesLabel: 'OK'
  });
```


##TODO

- [ ] better documentation
- [ ] tests
- [x] make sure all subviews are destroyed properly
- [x] take react components for sub views
