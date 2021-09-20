
import { Col, Container, Form, Row } from 'react-bootstrap';
import './Login.css'
import { faEnvelope,faUnlock} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@restart/ui/esm/Button';

import React, { Component } from 'react';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false
        }
    }

    render() {
        
        return (
            <div className="main d-flex pt-5 pb-5">
            <Container >
                <Row className="d-flex rouder" >
                    <Col className="m-5 bg-light text-dark  p-5 rounded ">
                         <h3 className="text-center mb-4">login</h3>
                         <Form>
                             <Form.Group className="mb-3" controlId="ControlInput2">
                                 <span className="">
                                 <FontAwesomeIcon className="placeholderdd d-block" icon={faEnvelope} />
                                 <Form.Control  className="placeholderff bg-gray" onChange={this.props.inputHandler} name="email" type="email"  placeholder= "name@example.com" />
                                 </span>
               
                             </Form.Group>
                             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                 <span>
                                 <FontAwesomeIcon className="placeholderdd d-block" icon={faUnlock} />
                                 <Form.Control className="placeholderff mb-5" onChange={this.props.inputHandler} name="password"  type="password" placeholder="your password" />
                                 </span>
                             </Form.Group>
                             {
                                 (Object.keys(this.props.config).length >= 2) && (
                                     <>
                                         <Button onClick={this.props.submit}  className="rounded stylebtn text-uppercase" bg="primary" type="submit">Submit</Button>
                                     </>
                                 )
                             }
 
                             {
                                 (Object.keys(this.props.config).length <= 1) && (
                                     <>
                                         <Button disabled  className="rounded stylebtn text-uppercase" bg="primary" type="submit">Submit</Button>
                                     </>
                                 )
                             }
                             
                             </Form>
                    </Col>
                </Row>
            </Container>
        </div>
        );
    }
}

export default Login;