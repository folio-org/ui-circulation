module.exports.test = function(uiTestCtx) {
  describe('Module test: circulation:settings', function() {
    const { config, utils: { auth, names } } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);

    this.timeout(Number(config.test_timeout));

    describe('Login > Open Circulation settings > Logout', () => {
      before( done => {
        auth.login(nightmare,config,done);
      })
      it('should open module "Check Out"', done => {
        nightmare
        .wait('#clickable-checkout-module')
        .click('#clickable-checkout-module')
        .then(function(result) {
          done()
        })
        .catch(done)
      })
      it('should open Circulation settings, Loan policies', done => {
        nightmare
        .wait(config.select.settings)
        .click(config.select.settings)
        .wait('a[href="/settings/circulation"]')
        .click('a[href="/settings/circulation"]')
        .wait(2222)
        .wait('a[href="/settings/circulation/loan-policies"]')
        .then(result => { done() })
        .catch(done)
      })
      it('should log out', done => {
          auth.logout(nightmare,config,done);
      })
    })
  })
}