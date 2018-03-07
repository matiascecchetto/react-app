import React, { Component } from 'react';

class Pet extends Component {
  constructor() {
    super();
  }

  //This hook runs after the component output has been rendered to the DOM
  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="comment">
        <div className="panel panel-info">
          <div className="panel-heading">
            <div className="inline-left">
              <h3 className="panel-title">
                {this.props.pet.name}
              </h3>
            </div>
          </div>
          <div className="panel-body">
            {this.props.pet.email}
          </div>
        </div>
      </div>
    );
  }

}

export default Pet;
