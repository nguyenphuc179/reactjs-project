import React, { Component } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { postMethod } from '../../api-base';

import {
    BrowserRouter as Router,
    withRouter,
    useParams,
    useHistory
} from "react-router-dom";

import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';


class LOGINCONTAINER extends Component {
    constructor(props) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
        this.renderLoginView = this.renderLoginView.bind(this);
        this.state = {
            email: '',
            type: '',
            textError: ''
        }

    }


    doLogin(email, type) {
        //'debra.burks@yahoo.com'
        let loginForm = {
            loginType: type.toLowerCase(),
            email: email
        }

        postMethod({ url: '/login/', formBody: loginForm }).then(res => {
            if (!res.data.customerInfo) {
                return this.setState({ textError: res.data.reason + ' --- ' + 'Wrong Email' });
            }

            localStorage.setItem('info', JSON.stringify(res.data.customerInfo))
            localStorage.setItem('your-token', res.data.token)
            this.props.history.push('/father');
        });
    }

    render() {
        const { email, type, textError } = this.props;
        return (
            <Container>
                {this.renderLoginView(email, type)}
                <br></br>
                {/* <DuplicateText errorMessage={textError}></DuplicateText> */}
            </Container>
        )
    }

    renderLoginView(email, type) {
        return (
            <Row>
                <Col sm={12}>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email"
                                value={email} onChange={(e) => email = e.target.value}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Login As</Form.Label>
                            <Form.Control onChange={(e) => type = e.target.value} as="select">
                                <option>Select</option>
                                <option>Customer</option>
                                <option>Staff</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button onClick={() => this.doLogin(email, type)}>Login</Button>
                </Col>
            </Row>
        )
    }
}




// Store to UI
function mapStoreToProps(props) {
    let { loginTest } = props;
    return loginTest;
}

// UI to Action
function mapDispatchToProps(dispatch) {

    return {
        actionsX: (x, y) => { dispatch({ type: y, email: x }) }
    }
}



// Config UI and Action
export const LoginWithHOC = connect(mapStoreToProps, mapDispatchToProps)(withRouter(LOGINCONTAINER));



