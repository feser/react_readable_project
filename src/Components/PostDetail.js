import React from 'react';
import { connect } from 'react-redux'
import { setAddCommentModal} from "../actions"
import Post from "./Post"
import Comment from "./Comment"
import AddComment from "./AddComment"
import UpdateComment from "./UpdateComment"
import { Link } from 'react-router-dom'
import { Button} from 'reactstrap';

const PostDetail = (props) =>  {

    const openAddCommentModal = () => {
        props.setAddCommentModal(true);
    }

    let post = {}
    if(props.posts && props.posts.data){
        const postList = props.posts.data.filter(post => post.id ===props.match.params.postId);
        post = postList.length > 0 ? postList[0] : {} ;
    }
    return (
        <div>
            {post && post.id ?
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 text-center">
                                <Link to='/'><br/>Main Page<br/></Link>
                            </div>
                        </div>
                    </div>
                    {post && post.id ? <Post post={post} showDetail="false" history={props.history}/> : ""}
                    <div className="container-fluid">
                        <div className="row mt-4">
                            <div className="col-12 text-left">
                                <Button color="primary" size="sm" onClick={() => openAddCommentModal()}>Add
                                    Comment</Button>{' '}
                            </div>
                        </div>
                    </div>
                    {props.comments && props.comments[post.id] && props.comments[post.id].length > 0 ?
                        <div className="row mt-4">
                            <div className="col-12 text-center">
                                Comments
                            </div>
                        </div>
                        : ""}
                    {props.comments && props.comments[post.id] && props.comments[post.id].map((comment) => (
                        <Comment key={comment.id}   comment={comment}/>
                    ))}

                    <AddComment postId={props.match.params.postId}/>
                    <UpdateComment/>

                </div>
                :
                <div>
                     <span>Can not find the post.</span>
                     <Link to='/'><br/>Click here for main page<br/></Link>
                </div>
            }
        </div>
    );

}

function mapStateToProps ({ posts, categories, comments}) {
    return {
        posts,
        comments,
        categories
    }
}


function mapDispatchToProps (dispatch) {
    return {
        setAddCommentModal: (open) => dispatch(setAddCommentModal(open))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail)



