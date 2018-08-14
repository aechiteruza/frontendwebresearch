import React, { Component } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Modal, Button, Card, CardBody, CardGroup, Col, Container, Form, Badge, DropdownItem, DropdownMenu, DropdownToggle, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router';
import { AppHeaderDropdown } from '@coreui/react';
import { Link } from 'react-router-dom';
import Showname from '../Login/Showname';
class NodeRED extends Component {

  constructor() {
    super();
    this.toggleToken = this.toggleToken.bind(this);
    this.state = {
      firstname: undefined,
      lastname: undefined,
      username: undefined,
      email: undefined,
      password: undefined,
      signUp: {
        success: undefined,
        message: undefined
      },
      DetailPage: true,
      logged: false,
      users: undefined,
      error: undefined,
      modal: false,
      modalToken: false
    }

  }

  static displayName = 'ui-LoginForm';


  componentDidMount() {
    this.verifytoken();
  }

  toggleToken() {
    this.setState({
      modalToken: !this.state.modalToken,
    });
  }

  getnameandemail() {
    let getuserfirstname = localStorage.getItem('USERS_FIRSTNAME');
    let getuserlastname = localStorage.getItem('USERS_LASTNAME');
    let getemail = localStorage.getItem('USERS_EMAIL');
    let getusername = localStorage.getItem('USERS_USERNAME');

    this.setState({
      firstname: getuserfirstname,
      lastname: getuserlastname,
      email: getemail,
      username: getusername
    })
  }

  verifytoken() {
    let url = 'http://localhost:3000/auth/verifytoken';
    let token = localStorage.getItem('USERS_TOKEN');
    if (!token) {
      this.setState({
        error: "No token defined.",
        logged: false
      })
      this.toggleToken()
      return
    }
    fetch(url, {
      method: "GET",
      body: undefined,
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    }).then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          this.setState({
            users: responseJson.success,
            error: undefined,
            logged: true
          })
          this.getnameandemail();
        } else {
          localStorage.clear();
          this.setState({
            error: responseJson.error.message,
            logged: false
          })
        }
      }).catch(err => this.setState({ error: err }));

  }

  handleDetailPageChange(e) {
    this.setState({
      DetailPage: e.target.value
    })
  }

  render() {
    setTimeout(() => {
      this.setState({
        DetailPage: false
      })
    }, 100)
    return (
      <div className="container">
        {
          this.state.DetailPage === false ? (
            this.state.logged === true ?
              ///BEGIN DETAIL FORM AREA
              <div className="app flex-row align-items-top">
                <Container>
                  <Row className="justify-content-left">
                    <Col md="6">
                      <Card className="mx-6">
                        <CardBody className="p-6">
                          <Form>
                            <h2 className="text-muted">User Data NodeRED Page.</h2>
                            <Showname details={this.state} />
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
            ///END DETAIL FORM AREA
              :
              <div className="app flex-row align-items-top">
                <Container>
                  <Row className="justify-content-left">
                    <Col md="6">
                      <Card className="mx-6">
                        <CardBody className="p-6">
                          <Form>
                            <h2 className="text-muted">Please logged in.</h2>
                            <Link to='/pages/login'><Button color="primary" >Login</Button></Link>
                           
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
              
          ) : ''
        }
      </div>
    );
  }
}

export default NodeRED;
