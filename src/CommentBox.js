import React, { Component } from 'react';
import Comment from './Comment';

class CommentBox extends Component {

  constructor() {
    super();
    this.state = {
      showComments: false
    };
  }

  //This hook runs after the component output has been rendered to the DOM
  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    const comments = this._getComments();
    let opts = {}
    let commentNodes;
    if (this.state.showComments) {
      commentNodes =
        <div className="comment-list">
          {comments}
        </div>;
    }
    if (!comments.length) {
      opts['disabled'] = 'disabled';
    }
    return(
      <div className="comment-box">
        <h3>Comments</h3>
        <div className="bs-example" data-example-id="navbar-link">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header inline-left">
                <h4 className="navbar-brand">
                  {this._getCommentsTitle(comments.length)}
                </h4>
              </div>
              <div className="collapse navbar-collapse inline-right" id="bs-example-navbar-collapse-5">
                <p className="navbar-text navbar-right"><button onClick={this._handleClick.bind(this)} className="btn btn-primary" {...opts}>{this._getButtonText(comments.length, this.state.showComments)}</button></p>
              </div>
            </div>
          </nav>
        </div>
        {commentNodes}
      </div>
    );
  }

  _getComments() {
    const commentList = [
      { id: 1, author: 'Morgan McCircuit', body: 'Great picture!' },
      { id: 2, author: 'Bending Bender', body: 'Excellent stuff' }
    ];
    return commentList.map(
      (comment) => {
        return (
          <Comment author={comment.author} body={comment.body} key={comment.id} />
        );
      }
    );
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }

  _getButtonText(commentCount, showComments) {
    if (commentCount > 1 && !showComments) {
      return 'Show comments';
    } else if (commentCount > 1 && showComments) {
      return 'Hide comments';
    } else if (!(commentCount > 1) && !showComments) {
      return 'Show comment';
    } else {
      return 'Hide comment';
    }
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

}

export default CommentBox;
