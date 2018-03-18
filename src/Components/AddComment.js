import React from 'react';
import { connect } from 'react-redux'
import { setAddCommentModal, addComment} from "../actions"
import { Button, Modal, ModalHeader, Form, FormGroup, Label, Input, Col} from 'reactstrap';

const AddComment = (props) => {

    const toggleAddCommentModal = ()  => {
        props.setAddCommentModal(!props.addCommentModal);
    }

    const submitAddCommentForm = (e) =>  {
        e.preventDefault();
        const {elements: { author, body }} = e.target;
        const comment = {
            author: author.value,
            body: body.value,
            parentId: props.postId,
        };
        props.addComment(comment);
        toggleAddCommentModal();
    }
    return (
            <Modal isOpen={props.addCommentModal} toggle={() => toggleAddCommentModal()} >
                <ModalHeader toggle={() => toggleAddCommentModal()}>Add Comment</ModalHeader>
                <Form onSubmit={submitAddCommentForm}>
                    <FormGroup row className="mt-2 ml-sm-1">
                        <Label for="author" sm={3}>Author</Label>
                        <Col sm={8}>
                            <Input required type="text" name="author" id="author" />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="ml-sm-1">
                        <Label for="body" sm={3}>Body</Label>
                        <Col sm={8}>
                            <Input required type="textarea" name="body" id="body" />
                        </Col>
                    </FormGroup>
                    <FormGroup row className="ml-sm-3">
                        <Button color="danger" className="mr-sm-2" onClick={() => toggleAddCommentModal()}>Cancel</Button>
                        <Button type="submit" color="success" >Submit</Button>
                    </FormGroup>
                </Form>
            </Modal>
        );
}

function mapStateToProps ({addCommentModal}) {
    return {
        addCommentModal
    }
}


function mapDispatchToProps (dispatch) {
    return {
        setAddCommentModal: (open) => dispatch(setAddCommentModal(open)),
        addComment: (comment) => dispatch(addComment(comment))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddComment)



