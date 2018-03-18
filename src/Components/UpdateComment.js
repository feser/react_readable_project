import React from 'react';
import { connect } from 'react-redux'
import { setUpdateCommentModal, updateComment} from "../actions"
import { Button, Modal, ModalHeader, Form, FormGroup, Label, Input, Col} from 'reactstrap';

const UpdateComment = (props) => {

    const toggleUpdateCommentModal = () => {
        props.setUpdateCommentModal(!props.updateCommentModal);
    }

    const submitUpdateCommentForm = (e) =>  {
        e.preventDefault();
        const {elements: { body }} = e.target;
        const comment = {
            body: body.value,
            id: props.currentUpdateComment.id,
            parentId : props.currentUpdateComment.parentId
        };
        props.updateComment(comment);
        toggleUpdateCommentModal();
    };

    return (
        <Modal isOpen={props.updateCommentModal} toggle={() => toggleUpdateCommentModal()} >
            <ModalHeader toggle={() => toggleUpdateCommentModal()}>Update Comment</ModalHeader>
            <Form onSubmit={submitUpdateCommentForm}>
                <FormGroup row className="ml-sm-1">
                    <Label for="body" sm={3}>Body</Label>
                    <Col sm={8}>
                        <Input required type="textarea" name="body" id="body"
                               defaultValue={props.currentUpdateComment ? props.currentUpdateComment.body : ""}/>
                    </Col>
                </FormGroup>
                <FormGroup row className="ml-sm-3">
                    <Button color="danger" className="mr-sm-2" onClick={() => toggleUpdateCommentModal()}>Cancel</Button>
                    <Button type="submit" color="success" >Submit</Button>
                </FormGroup>
            </Form>
        </Modal>
    );
}

function mapStateToProps ({ updateCommentModal, currentUpdateComment}) {
    return {
        updateCommentModal,
        currentUpdateComment
    }
}


function mapDispatchToProps (dispatch) {
    return {
        updateComment: (comment) => dispatch(updateComment(comment)),
        setUpdateCommentModal: (open) => dispatch(setUpdateCommentModal(open))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateComment)



