var chai = require('chai');
var sinon = require('sinon');
var mockRequire = require('mock-require');
mockRequire('http', { request: function() {
	console.log('request function called');
}});
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      var http = require('http');
	  http.request();
      var spy = sinon.spy();
	  spy('foo');
	  sinon.assert.calledWith(spy, 'foo');
      chai.expect([1,2,3].indexOf(4)).to.equal(-1);
    });
  });
});

