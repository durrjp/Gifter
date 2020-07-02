import React, {useRef, useContext, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { PostContext } from '../providers/PostProvider';

const PostForm = (props) => {
    const title = useRef()
    const imageURL = useRef()
    const caption = useRef()
    const userId = useRef()

    const {addPost} = useContext(PostContext)

    const constructNewPost = () => {
        const newPostObject = {
            title: title.current.value,
            imageURL: imageURL.current.value,
            caption: caption.current.value,
            dateCreated: new Date(),
            userProfileId: userId.current.value
        }
        debugger
        addPost(newPostObject)
    }

  return (
    <div className="container">
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
        <FormGroup>
            <Label for="newUpId">User Profile Id</Label>
            <Input type="number" name="upId" id="newUpId" innerRef={userId} />
        </FormGroup>
        <Button onClick={(e) => {
            e.preventDefault()
            constructNewPost()
        }}>Submit</Button>
        </Form>
    </div>
  );
}

export default PostForm;
