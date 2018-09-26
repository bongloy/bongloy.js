/**
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * Mocha - Browser test Bongloy.js
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 */

(function($, expect, TO) {

'use strict';

// Don't need to display test output.
TO.silentMode();

/**
 * --------------------------------------------------------
 * Spec - Bongloy.js
 * --------------------------------------------------------
 */
describe('Bongloy.js - Data testing', function() {
  var _windowMessageHandler;

  before(function() {
    Bongloy.config = {
      vaultUrl: "http://api.lvh.me:3000",
      assetUrl: "http://js.lvh.me:3000"
    }

    Bongloy.setPublishableKey('pk_test_d7c12df3795b8c6f9e2ede45e8b57d292fcf239c5becec2daea3f6c3ba806d09');
  });

  it('Should create token from card information properly', function(done) {
    this.timeout(5000);

    var cardInfomation = {
      name: 'Ratchagarn Naewbuntad',
      number: '4242424242424242',
      exp_month: '12',
      exp_year: '2020',
      cvc: '123'
    };

    Bongloy.createToken('card', cardInfomation, function(code, resp) {
      expect(code).to.equal(201);
      expect(resp.object).to.equal('token');
      expect(typeof resp.id).to.equal('string');
      done();
    });
  });

  it('Should handler error from card information properly', function(done) {
    var cardInfomation = {
      name: 'Ratchagarn Naewbuntad',
      number: '424242424242424',
      exp_month: '13',
      exp_year: '2099',
      cvc: '092'
    };

    Bongloy.card.createToken(cardInfomation, function(code, resp) {
      expect(code).to.equal(422);
      expect(resp.error.message).to.match(/is invalid/);
      expect(typeof resp.error).to.equal('object');
      done();
    });
  });

  after(function() {
    window.removeEventListener('message', _windowMessageHandler, false);
  })
});

})(
  window.jQuery,
  window.chai.expect,
  window._TO_
);
