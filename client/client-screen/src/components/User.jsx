
import React, { useEffect, useState } from 'react';
import { Navbar, Container, Form, Button, Row, Col } from 'react-bootstrap';

const User = () => {
    const [userInputFields, setUserInputFields] = useState([]);
    const [userData, setUserData] = useState({});
    const [validated,setValidated]= useState(false);
    useEffect(() => {
        fetchData();
    }, []);


    const twoWayBind=(key,value)=>{
        const userDataCopy ={...userData}
        userDataCopy[key] = value
        setUserData(userDataCopy)
    }


    const fetchData = async () => {
        const data = await fetch("http://localhost:5000/api/getDynamicFields");
        const parseData = await data.json();

        if (parseData.data && Array.isArray(parseData.data) && parseData.data.length) {
            setUserInputFields(parseData.data)
        }
    }


    const submitForm =(event)=>{
        event.preventDefault();
        const form = event.currentTarget;
        setValidated(true)
        if(form.checkValidity()){
            alert("form is valid")
        }
        else{
            alert("form is not valid")
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
                <Form noValidate validated={validated} onSubmit={(event)=> submitForm(event)}>
                    {
                        userInputFields && userInputFields.length ?  userInputFields.map((item, index) => {
                            return (
                                <Row key={index} className='mb-3'>
                                    <Form.Group as={Col} controlId="formName">
                                        <Form.Label>{item?.inputLabel}</Form.Label>
                                        {
                                            item?.inputType !== "dropdown" ?
                                                <React.Fragment>
                                                    <Form.Control
                                                        type={item?.inputType}
                                                        placeholder={item?.PlaceHolder}
                                                        onChange={(event) => twoWayBind(item?.keyName, event.target.value)}
                                                        value={userData[item?.keyName]}
                                                        required={item?.required} />
                                                    <Form.Control.Feedback type="invalid">
                                                         {`Please enter a valid ${item?.inputLabel}`}
                                                    </Form.Control.Feedback>
                                                </React.Fragment>
                                                 :
                                                <React.Fragment>
                                                    <Form.Select
                                                     required={item?.required} 
                                                        //defaultValue={item?.PlaceHolder}
                                                        onChange={(event) => twoWayBind(item?.keyName, event.target.value)}
                                                        value={userData[item?.keyName]}
                                                        >
                                                        <option disabled={true}>{item?.PlaceHolder}</option>
                                                        {item?.options && Array.isArray(item?.options) && item?.options.length &&
                                                            item?.options.map((option, index) => {
                                                                return <option key={index}>{option.label}</option>;
                                                            })}
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">
                                                        {`Please enter a valid ${item?.inputLabel}`}
                                                    </Form.Control.Feedback>
                                                </React.Fragment>
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
                   

                     {/* <Row className="mb-3">
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="Enter your age" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Row> */}
                </Form>
            </Container>
        </React.Fragment>

    )

}

export default User;