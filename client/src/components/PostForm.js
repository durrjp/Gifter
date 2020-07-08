import React, {useRef, useContext} from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardBody} from 'reactstrap';
import { PostContext } from '../providers/PostProvider';
import { useHistory } from "react-router-dom";

const PostForm = (props) => {
    const title = useRef()
    const imageURL = useRef()
    const caption = useRef()
    // Use this hook to allow us to programatically redirect users
    const history = useHistory();

    const {addPost} = useContext(PostContext)

    const constructNewPost = () => {
        const newPostObject = {
            title: title.current.value,
            imageURL: imageURL.current.value,
            caption: caption.current.value,
            dateCreated: new Date(),
        }

        addPost(newPostObject).then((p) => {
            // Navigate the user back to the home route
            history.push("/");
        });
    }

  return (
    <div className="container pt-4">
        <div className="row justify-content-center">
            <Card className="col-sm-12 col-lg-6">
                <CardBody>
                    <h1>New Post</h1>
                    <Form>
                        <FormGroup>
                            <Label for="newTitle">Title</Label>
                            <Input type="text" name="Title" id="newTitle" placeholder="title" innerRef={title} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newImage">Image URL</Label>
                            <Input type="text" name="Image" id="newImage" placeholder="image url" innerRef={imageURL} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newCaption">Caption</Label>
                            <Input type="textarea" name="Caption" id="newCaption" innerRef={caption} />
                        </FormGroup>
                        <Button onClick={(e) => {
                            e.preventDefault()
                            constructNewPost()
                        }}>Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    </div>
  );
}

export default PostForm;
