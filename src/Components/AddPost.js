import React from 'react';
import { connect } from 'react-redux'
import { addPost} from "../actions"
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';


const AddPost = (props) => {

    const submitForm = (e) =>  {
        e.preventDefault();
        const {elements: { author, title, body, category }} = e.target;
        const post = {
            body: body.value,
            title: title.value,
            author: author.value,
            category: category.value
        };
        props.addPost(post);
        props.history.goBack();
    };


    const {categories} = props;
    return (
        <Form onSubmit={submitForm}>
            <FormGroup row className="mt-2 ml-sm-1">
                <Label for="title" sm={3}>Title</Label>
                <Col sm={8}>
                    <Input required type="text" name="title" id="title" />
                </Col>
            </FormGroup>
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
            <FormGroup row className="ml-sm-1">
                <Label for="category" sm={3}>Category</Label>
                <Col sm={8}>
                    <Input required type="select" name="category" id="category" multiple>
                        {categories && categories.map && categories.map((category) => (
                            <option key={category.name}>{category.name}</option>
                        ))}
                    </Input>
                </Col>
            </FormGroup>

            <FormGroup row className="ml-sm-3">
                <Button color="danger" className="mr-sm-2" onClick={() => props.history.goBack()}>Cancel</Button>
                <Button type="submit" color="success" >Submit</Button>
            </FormGroup>
        </Form>

    );

}

function mapDispatchToProps (dispatch) {
    return {
        addPost: (post) => dispatch(addPost(post)),
    }
}

function mapStateToProps ({ categories }) {
    return {
        categories
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPost)

