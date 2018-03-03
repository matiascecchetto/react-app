import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  //This hook runs after the component output has been rendered to the DOM
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // function setState makes the React engine re-render the DOM changes
    // must NEVER update state directly as this.state = new Date()
    // only allowed to do so in Constructor
    // State updates are batched to increase performance, so any update must
    // refer to previous state before update in aggregation operations
    // Example:
    // this.setState((prevState, props) => ({
    //   counter: prevState.counter + props.increment
    // }));
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="Clocks">
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock;
