import React, { Component } from 'react';
import './CommentForm.css';

class CommentForm extends Component {
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
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the discussion</label>
        <div className="comment-form-fields">
          <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2">Name: </span>
            <input type="text" name="comment[author]" placeholder="What's your name?" className="form-control" aria-describedby="sizing-addon1" ref={(input) => this._author = input}/>
          </div>
          <div className="input-group input-group-lg">
            <span className="input-group-addon" id="sizing-addon2">Comment: </span>
            <textarea name="comment[body]" placeholder="Join the discussion..." className="form-control" aria-describedby="sizing-addon1" maxLength="300" ref={(textarea) => this._body = textarea}></textarea>
          </div>
        </div>
        <div className="comment-form-actions">
          <button type="submit">Post comment</button>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }
}

export default CommentForm;
