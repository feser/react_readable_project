import React from 'react';
import { connect } from 'react-redux'
import { updatePost } from "../actions"
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';


const UpdatePost = (props) => {

    const submitForm = (e) => {
        e.preventDefault();
        const {elements: { title, body }} = e.target;
        const post = {
            id : props.match.params.postId,
            body: body.value,
            title: title.value
        };
        props.updatePost(post);
        props.history.goBack();
    };

    let post = {}
    if(props.posts && props.posts.data){
        const postList = props.posts.data.filter(post => post.id ===props.match.params.postId);
        post = postList.length > 0 ? postList[0] : {} ;
    }
    return (
        <div>
            {post && <post className="id"></post> ?
                <Form onSubmit={submitForm}>
                    <FormGroup row className="mt-2 ml-sm-1">
                        <Label for="title" sm={3}>Title</Label>
                        <Col sm={8}>
                            <Input required type="title" name="title" id="title" defaultValue={post.title} />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="ml-sm-1">
                        <Label for="body" sm={3}>Body</Label>

                        <Col sm={8}>
                            <Input required type="body" name="body" id="body" defaultValue = {post.body} />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="ml-sm-3">
                        <Button type="submit">Submit</Button>
                    </FormGroup>
                </Form>
                : ""}
        </div>
    );
}

function mapStateToProps ({ posts}) {
    return {
        posts
    }
}

function mapDispatchToProps (dispatch) {
    return {
        updatePost: (post) => dispatch(updatePost(post))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdatePost)

