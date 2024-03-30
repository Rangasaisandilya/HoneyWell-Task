
import React, { useEffect, useState } from 'react';
import { Navbar, Container, Form, Button, Row, Col } from 'react-bootstrap';

const User = () => {
    const [userInputFields, setUserInputFields] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const data = await fetch("http://localhost:5000/api/getDynamicFields");
        const parseData = await data.json();

        if (parseData.data && Array.isArray(parseData.data) && parseData.data.length) {
            setUserInputFields(parseData.data)
        }
    }

    return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#">Dyanmic Fields User Form</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
            <Container className='my-3'>
                <h1>User Dyanmic Form</h1>
                <Form>


                    {
                        userInputFields && userInputFields.length ?  userInputFields.map((item, index) => {
                            return (
                                <Row key={index} className='mb-3'>
                                    <Form.Group as={Col} controlId="formName">
                                        <Form.Label>{item?.inputLabel}</Form.Label>
                                        {
                                            item?.inputType !== "dropdown" ?
                                                <Form.Control type={item?.inputType} placeholder={item?.PlaceHolder} /> :
                                                <Form.Select defaultValue={item?.PlaceHolder}>
                                                    <option>{item?.PlaceHolder}</option>
                                                    {
                                                        item?.options && Array.isArray(item?.options) && item?.options.length &&
                                                        item?.options.map((option, index) => {
                                                            return <option key={index}>{option.label}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                        }

                                    </Form.Group>
                                </Row>
                            )
                        }) :

                        <h2 className='text-danger text-center'>User Data not rendered</h2>
                    }
                    {
                        userInputFields && userInputFields.length &&  <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    }
                   
                </Form>
            </Container>
        </React.Fragment>

    )

}

export default User;