import React, { Component } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import jQuery from 'jquery';
import Pet from './Pet';

class CommentBox extends Component {

  constructor() {
    super();
    this.state = {
      showComments: false,
      pets: [],
      comments: []
    };
  }

  // This hook runs after the component output has been rendered to the DOM
  componentDidMount() {
    this._timer = setInterval( () => this._fetchComments(), 5000 );
    this._timer2 = setInterval( () => this._fetchPets(), 5000 );
  }

  componentWillUnmount() {
    clearInterval(this._timer);
    clearInterval(this._timer2);
  }

  render() {
    const comments = this._getComments();
    const pets = this._getPets();
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
        <CommentForm addComment={this._addComment.bind(this)} />
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
        {pets}
      </div>
    );
  }

  _getComments() {
    return this.state.comments.map(
      (comment) => {
        return (
          <Comment comment={comment} onDelete={this._deleteComment.bind(this)}/>
        );
      }
    );
  }

  _getPets() {
    return this.state.pets.map(
      (pet) => {
        return (
          <Pet pet={pet} key={pet.id}/>
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

  _addComment(author, body) {
    const comment = { author, body };
    jQuery.post(process.env.REACT_APP_BACKEND_URL, { comment })
      .done( () => {
        this._fetchComments();
      });
  }

  _fetchComments() {
    jQuery.ajax({
      method: 'GET',
      url: process.env.REACT_APP_BACKEND_URL,
      // contentType: "application/json; charset=utf-8",
      // dataType: "json",
      // xhrFields: {
      //   // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
      //   // This can be used to set the 'withCredentials' property.
      //   // Set the value to 'true' if you'd like to pass cookies to the server.
      //   // If this is enabled, your server must respond with the header
      //   // 'Access-Control-Allow-Credentials: true'.
      //   withCredentials: false
      // },
      // headers: {
      //   'Access-Control-Allow-Methods': 'GET',
      //   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      //   'Access-Control-Allow-Origin': 'http:localhost:3001/api/all'
      // },
      success: (comments) => {
        this.setState({comments})
      }
    });
  }

  _deleteComment(comment) {
    jQuery.ajax({
      method: 'DELETE',
      url: process.env.REACT_APP_BACKEND_URL + '/' + `${comment.id}`,
      success: () => {
        this._fetchComments();
      }
    });
  }

  _fetchPets() {
    jQuery.ajax({
      method: 'GET',
      url: process.env.REACT_APP_SPRING_BACKEND_URL,
      // contentType: "application/json; charset=utf-8",
      // dataType: "json",
      // xhrFields: {
      //   // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
      //   // This can be used to set the 'withCredentials' property.
      //   // Set the value to 'true' if you'd like to pass cookies to the server.
      //   // If this is enabled, your server must respond with the header
      //   // 'Access-Control-Allow-Credentials: true'.
      //   withCredentials: false
      // },
      // headers: {
      //   'Access-Control-Allow-Methods': 'GET',
      //   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      //   'Access-Control-Allow-Origin': 'http:localhost:3001/api/all'
      // },
      success: (pets) => {
        this.setState({pets})
      }
    });
  }

}

export default CommentBox;
