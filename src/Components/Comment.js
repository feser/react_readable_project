import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'reactstrap';
import {} from "../actions"
import {setUpdateCommentModal, deleteComment, setCurrentUpdateComment, upVoteComment, downVoteComment} from "../actions/index";


const Comment = (props) => {

    const openUpdateCommentModal = (comment) => {
        props.setCurrentUpdateComment(comment);
        props.setUpdateCommentModal(true);
    }

    const deleteComment = (comment) => {
        props.deleteComment(comment);
    }

    const upVote = (comment) => {
        props.upVoteComment(comment);
    }

    const downVote = (comment) => {
        props.downVoteComment(comment);
    }
    
    const {comment} = props;
    return (
          <div className="container-fluid" key={comment.id}>
              <div className="row">
                  <div className="col-12 text-left">
                      <Button color="primary" size="sm" onClick={() => openUpdateCommentModal(comment)}>Edit</Button>{' '}
                      <Button color="primary" size="sm" onClick={() => deleteComment(comment)}>Delete</Button>
                  </div>
              </div>
              <div className="row">
                  <div className="col-3 text-left font-weight-bold">
                      Author:
                  </div>
                  <div className="col-9 text-left">
                      {comment.author}
                  </div>
              </div>
              <div className="row">
                  <div className="col-3 text-left font-weight-bold">
                      Body:
                  </div>
                  <div className="col-9 text-left">
                      {comment.body}
                  </div>
              </div>
              <div className="row">
                  <div className="col-3 text-left font-weight-bold">
                      Vote Score:
                  </div>
                  <div className="col-9 text-left">
                      {comment.voteScore}
                  </div>
              </div>
              <div className="row">
                  <div className="col-3 text-left font-weight-bold">
                      Date:
                  </div>
                  <div className="col-9 text-left">
                      {new Date(comment.timestamp).toLocaleString()}
                  </div>
              </div>
              <div className="row">
                  <div className="col-6 text-right">
                      <Button color="success" size="sm" onClick={() => upVote(comment)}>Vote Up</Button>
                  </div>
                  <div className="col-6 text-left">
                      <Button color="danger" size="sm" onClick={() => downVote(comment)}>Vote Down</Button>
                  </div>
              </div>
              <br/>
          </div>
    );
  
}

function mapStateToProps () {
    return {};
}

function mapDispatchToProps (dispatch) {
    return {
        setUpdateCommentModal: (open) => dispatch(setUpdateCommentModal(open)),
        upVoteComment: (comment) => dispatch(upVoteComment(comment)),
        downVoteComment: (comment) => dispatch(downVoteComment(comment)),
        deleteComment: (post) => dispatch(deleteComment(post)),
        setCurrentUpdateComment: (comment) => dispatch(setCurrentUpdateComment(comment))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment)



