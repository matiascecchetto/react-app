import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
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
                {this.props.comment.author}
              </h3>
            </div>
            <div className="inline-right">
              <a href="#" className="btn btn-default" onClick={this._handleDelete.bind(this)}>
                <span className="glyphicon glyphicon-trash"></span>
              </a>
            </div>
          </div>
          <div className="panel-body">
            {this.props.comment.body}
          </div>
          <div className="panel-footer">
            <p>Comment created ...</p>
          </div>
        </div>
      </div>
    );
  }

  _handleDelete(e) {
    e.preventDefault();
    if (window.confirm('Are you sure?')) {
      this.props.onDelete(this.props.comment);
    }
  }

}

export default Comment;
