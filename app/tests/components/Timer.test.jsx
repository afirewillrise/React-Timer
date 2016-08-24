var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('Timer');

describe('Timer', () => {
  it('should exist', () => {
    expect(Timer).toExist();
  });

  it('should start timer on started status', (done) => {
    var timer = TestUtils.renderIntoDocument(<Timer/>);

    timer.handleStatusChange('started');
    expect(timer.state.count).toBe(0);

    setTimeout(() => {
      expect(timer.state.timerStatus).toBe('started');
      expect(timer.state.count).toBe(1);
      done();
    }, 1001);
  });

  it('should pause timer on paused status', (done) => {
    var timer = TestUtils.renderIntoDocument(<Timer/>);

    timer.setState({count: 10});
    timer.handleStatusChange('started');
    timer.handleStatusChange('paused');

    setTimeout(() => {
      expect(timer.state.timerStatus).toBe('paused');
      expect(timer.state.count).toBe(10);
      done();
    }, 1001);
  });

  it('should clear count on stopped status', (done) => {
    var timer = TestUtils.renderIntoDocument(<Timer/>);

    timer.setState({count: 10});
    timer.handleStatusChange('started');
    timer.handleStatusChange('stopped');

    setTimeout(() => {
      expect(timer.state.timerStatus).toBe('stopped');
      expect(timer.state.count).toBe(0);
      done();
    }, 1001);
  });

  describe('render', () => {
    it('should render start and clear when status is stopped', () => {
      var timer = TestUtils.renderIntoDocument(<Timer timerStatus='stopped'/>);
      var $el = $(ReactDOM.findDOMNode(timer));

      var $startButton = $el.find('button:contains(Start)');
      var $clearButton = $el.find('button:contains(Clear)');

      expect($startButton.length).toBe(1);
      expect($clearButton.length).toBe(1);
    });

    it('should render pause and clear when status is started', () => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);

      timer.handleStatusChange('started');

      var $el = $(ReactDOM.findDOMNode(timer));

      var $pauseButton = $el.find('button:contains(Pause)');
      var $clearButton = $el.find('button:contains(Clear)');

      expect($pauseButton.length).toBe(1);
      expect($clearButton.length).toBe(1);
    });
  });
});
