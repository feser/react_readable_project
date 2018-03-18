import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deletePost, setPostComments, updateVotePost, downVotePost } from "../actions"
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

class Post extends Component {

    componentDidMount() {
        const {post} = this.props;
        if(post && post.id){
            this.props.setPostComments(post.id);
        }
    }

    editPost = (post) => {
        this.props.history.push("/editpost/" + post.id);
    }

    deletePost = (post) => {
        this.props.deletePost(post);
        this.props.history.push("/");
    }

    upVote = (post) => {
        this.props.upVotePost(post);
    }

    downVote = (post) => {
        this.props.downVotePost(post);
    }

    render() {
        const {post} = this.props;
        const {showDetail} = this.props;
        return (

              <div className="container-fluid" key={post.id}>
                  <div className="row">
                      <div className="col-12 text-left">
                          <Button color="primary" size="sm" onClick={() => this.editPost(post)}>Edit</Button>{' '}
                          <Button color="primary" size="sm" onClick={() => this.deletePost(post)}>Delete</Button>{' '}
                          {showDetail && showDetail === "true" ?
                              <Link to={'/'+ post.category +'/'+ post.id}>Detail</Link>
                              : ""}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-3 text-left font-weight-bold">
                          Title:
                      </div>
                      <div className="col-9 text-left">
                          {post.title}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-3 text-left font-weight-bold">
                          Body:
                      </div>
                      <div className="col-9 text-left">
                          {post.body}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-3 text-left font-weight-bold">
                          Category:
                      </div>
                      <div className="col-9 text-left">
                          {post.category}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-3 text-left font-weight-bold">
                          Author:
                      </div>
                      <div className="col-9 text-left">
                          {post.author}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-3 text-left font-weight-bold">
                          Vote Score:
                      </div>
                      <div className="col-9 text-left">
                          {post.voteScore}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-3 text-left font-weight-bold">
                          Date:
                      </div>
                      <div className="col-9 text-left">
                          {new Date(post.timestamp).toLocaleString()}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-3 text-left font-weight-bold">
                          Comment Count:
                      </div>
                      <div className="col-9 text-left">
                          {this.props.comments && this.props.comments[post.id] ? this.props.comments[post.id].length : "0"}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-6 text-right">
                          <Button color="success" size="sm" onClick={() => this.upVote(post)}>Vote Up</Button>
                      </div>
                      <div className="col-6 text-left">
                          <Button color="danger" size="sm" onClick={() => this.downVote(post)}>Vote Down</Button>
                      </div>
                  </div>
              </div>
        );
  }
}

function mapStateToProps ({comments}) {
    return {
        comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
        upVotePost: (post) => dispatch(updateVotePost(post)),
        downVotePost: (post) => dispatch(downVotePost(post)),
        deletePost: (post) => dispatch(deletePost(post)),
        setPostComments: (postid, comments) => dispatch(setPostComments(postid, comments))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)



