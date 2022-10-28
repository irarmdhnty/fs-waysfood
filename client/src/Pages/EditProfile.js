import React from 'react'
import { Container} from 'react-bootstrap'
import FormEdit from '../Components/FormEdit'

function EditProfile() {
    return (
        <Container>
            <h2 className='my-5'>Edit Profile</h2>
            <FormEdit />
        </Container>
    )
}

export default EditProfile