import React, { Component, Fragment } from 'react';
import { Dropdown, ModalHeader, ModalBody, ModalFooter, Modal, Button, Card, CardBody, CardGroup, Col, Container, Form, Badge, DropdownItem, DropdownMenu, DropdownToggle, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router';
import { AppHeaderDropdown } from '@coreui/react';
import { Link } from 'react-router-dom';
import Showname from './Showname';
class Login extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.togglelogout = this.togglelogout.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleChangePassword = this.toggleChangePassword.bind(this);
    this.ProcessChangePassword = this.ProcessChangePassword.bind(this);
    this.handleFirstPasswordChange = this.handleFirstPasswordChange.bind(this);
    this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this);
    this.toggleChangeEmail = this.toggleChangeEmail.bind(this);
    this.ProcessChangeEmail = this.ProcessChangeEmail.bind(this);
    this.handleFirstEmailChange = this.handleFirstEmailChange.bind(this);
    this.handleSecondEmailChange = this.handleSecondEmailChange.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
    this.state = {
      firstname: undefined,
      lastname: undefined,
      username: undefined,
      email: undefined,
      password: undefined,
      dropdownOpen: new Array(6).fill(false),
      changepasswordst: undefined,
      changepasswordnd: undefined,
      changeemailst: undefined,
      changeemailnd: undefined,
      signUp: {
        success: undefined,
        message: undefined
      },
      DetailPage: true,
      logged: false,
      users: undefined,
      error: undefined,
      modal: false,
      modallogout: false,
      modalChangePassword: false,
      modalChangeEmail: false,
    }

  }

  static displayName = 'ui-LoginForm';


  componentDidMount() {
    this.verifytoken();
  }

  toggleDropdown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  togglelogout() {
    this.setState({
      modallogout: !this.state.modallogout,
    });
  }

  toggleChangePassword() {
    this.setState({
      modalChangePassword: !this.state.modalChangePassword,
    });
  }

  toggleChangeEmail() {
    this.setState({
      modalChangeEmail: !this.state.modalChangeEmail,
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
        error: "No token defined. Please Login.",
        logged: false
      })
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

  loggedOut() {
    this.setState({
      firstname: undefined,
      lastname: undefined,
      username: undefined,
      email: undefined,
      password: undefined,
      logged: false,
      users: undefined,
      error: undefined
    })
    localStorage.clear();
    this.setState({
      modallogout: !this.state.modallogout,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let dataToSend = {
      userData: {
        username: this.state.username,
        password: this.state.password
      }
    };
    let url = 'http://localhost:3000/auth/login';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        if (responseJson.success) {
          localStorage.setItem('USERS_TOKEN', responseJson.token);
          localStorage.setItem('USERS_LOGGED', true);
          localStorage.setItem('USERS_EMAIL', responseJson.email);
          localStorage.setItem('USERS_USERNAME', this.state.username);
          localStorage.setItem('USERS_FIRSTNAME', responseJson.firstname);
          localStorage.setItem('USERS_LASTNAME', responseJson.lastname);
          this.setState({
            firstname: responseJson.firstname,
            lastname: responseJson.lastname,
            username: this.state.username,
            email: responseJson.email,
            logged: true,
            error: undefined,
          })
        } else {
          this.setState({
            modal: !this.state.modal,
          });
        }
      }).catch(err => this.setState({ error: err }));
    e.target.reset()

  }

  ProcessChangePassword(e) {
    e.preventDefault();

    let dataToSend = {
      userData: {
        username: this.state.username,
        password: this.state.changepasswordst
      }
    };
      let url = 'http://localhost:3000/users/changepassword';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        if (responseJson.success) {
          alert('Password has changed')
          this.setState({
            modalChangePassword: !this.state.modalChangePassword,
          });
        } else { 
          alert(responseJson.err)
        }
      }).catch(err => this.setState({ error: err }));
      this.setState({
        changepasswordnd: undefined,
        changepasswordst: undefined,

      });

  }

  ProcessChangeEmail(e) {
    e.preventDefault();

    let dataToSend = {
      userData: {
        username: this.state.username,
        email: this.state.changeemailst
      }
    };
      let url = 'http://localhost:3000/users/changeemail';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        if (responseJson.success) {
          localStorage.setItem('USERS_EMAIL', responseJson.email);
          alert('Email has changed')
          this.setState({
            modalChangeEmail: !this.state.modalChangeEmail,
            email: this.state.changeemailst,
          });
        } else { 
          alert(responseJson.err)
        }
      }).catch(err => this.setState({ error: err }));
      this.setState({
        changeemailnd: undefined,
        changeemailst: undefined,

      });

  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleFirstPasswordChange(e) {
    this.setState({
      changepasswordst: e.target.value
    })
  }

  handleSecondPasswordChange(e) {
    this.setState({
      changepasswordnd: e.target.value
    })
  }

  handleFirstEmailChange(e) {
    this.setState({
      changeemailst: e.target.value
    })
  }

  handleSecondEmailChange(e) {
    this.setState({
      changeemailnd: e.target.value
    })
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
            this.state.logged !== true ?
              ///BEGIN LOGIN FORM AREA 

              <div className="row" style={{ paddingTop: '50px' }}>

                <div className="col">
                </div>
                <div className="col">
                  <div className="card" style={{ width: '20rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>

                    <div className="card-body">
                      <form onSubmit={this.handleSubmit}>
                        <div><img className="card-img-top" src={'assets/img/bannermqtt.jpg'} alt="Card image cap" /></div>
                        <div className="form-group">
                          <label htmlFor="exampleInputUsername">Username</label>
                          <input type="username" onChange={this.handleUsernameChange} className="form-control" id="exampleInputUsername" aria-describedby="usernameHelp" placeholder="Username" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Password</label>
                          <input type="password" onChange={this.handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="form-check">
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                        <small id="emailHelp" className="form-text text-muted">If you are not registered. Plese <Link to='/Pages/Register'><a href='#' data-toggle="modal" data-target="#signupModel" data-whatever="@mdo" >Signup</a></Link></small>
                        <br />
                      </form>
                      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Message</ModalHeader>
                        <ModalBody>
                          Username or Password donsn't match
                  </ModalBody>
                        <ModalFooter>
                          <Button color="secondary" onClick={this.toggle}>Close</Button>
                        </ModalFooter>
                      </Modal>

                    </div>
                  </div>

                </div>
                <div className="col">
                </div>
              </div>
              ///END LOGIN FORM AREA
              :
              ///BEGIN DETAIL FORM AREA
              <div className="app flex-row align-items-top">
                <Container>
                  <Row className="justify-content-left">
                    <Col md="6">
                      <Card className="mx-6">
                        <CardBody className="p-6">
                          <Form>
                            <h2 className="text-muted">Details.</h2>
                            <Showname details={this.state} />
                            <p>
                              <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {
                                this.toggleDropdown(0);
                              }}>
                                <DropdownToggle caret>
                                  <i className="fa fa-wrench"><h7 className="text-muted"> Menu</h7></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem onClick={this.toggleChangePassword}>Change Password</DropdownItem>
                                  <DropdownItem onClick={this.toggleChangeEmail}>Change Email</DropdownItem>
                                  <DropdownItem onClick={this.togglelogout}>Logout</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </p>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>


{/* Modal Change Email */}
                <Modal isOpen={this.state.modalChangeEmail} toggle={this.toggleChangeEmail} className={this.props.className}>
                  <ModalHeader toggle={this.toggleChangeEmail}>Message</ModalHeader>
                  <ModalBody>
                    <form>
                      <div className="form-group">
                        <label>New-Email</label>
                        <input type="text" ref='newemail' onChange={this.handleFirstEmailChange} className="form-control" id="newemail" aria-describedby="usernameHelp" placeholder="New-Email" />
                      </div>
                      <div className="form-group">
                        <label>Repeat New-Email</label>
                        <input type="text" ref='renewemail' onChange={this.handleSecondEmailChange} className="form-control" id="renewemail" placeholder="Repeat New-Email" />
                        {this.state.changeemailst === undefined ? '' : (this.state.changeemailst === this.state.changeemailnd) && this.state.changeemailst !== undefined ?
                          (<p><font color='green'>New-Email and Repeat New-Email is correct</font></p>)
                          : <p><font color='red'>New-Email and Repeat New-Email is incorrect</font></p>}
                      </div>
                      <div className="form-check">
                      </div>
                    </form>                  
                    </ModalBody>
                  <ModalFooter>
                    {(this.state.changeemailst === this.state.changeemailnd) && this.state.changeemailst !== undefined ?
                      (<Button color="primary" onClick={this.ProcessChangeEmail}>OK</Button>)
                      : <Button color="primary"  disabled='false' onClick={this.ProcessChangeEmail}>OK</Button>}

                    <Button color="secondary" onClick={this.toggleChangeEmail}>Close</Button>
                  </ModalFooter>
                </Modal>


                {/* Modal Change Password */}
                <Modal isOpen={this.state.modalChangePassword} toggle={this.toggleChangePassword} className={this.props.className}>
                  <ModalHeader toggle={this.toggleChangePassword}>Message</ModalHeader>
                  <ModalBody>
                    <form>
                      <div className="form-group">
                        <label htmlFor="exampleInputUsername">New-Password</label>
                        <input type="password" ref='newpassword' onChange={this.handleFirstPasswordChange} className="form-control" id="newpassword" aria-describedby="usernameHelp" placeholder="New-Password" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Repeat New-Password</label>
                        <input type="password" ref='repeatnewpassword' onChange={this.handleSecondPasswordChange} className="form-control" id="Repeatnewpassword" placeholder="Repeat New-Password" />
                        {this.state.changepasswordst === undefined ? '' : (this.state.changepasswordst === this.state.changepasswordnd) && this.state.changepasswordst !== undefined ?
                          (<p><font color='green'>New-Password and Repeat New-Password is correct</font></p>)
                          : <p><font color='red'>New-Password and Repeat New-Password is incorrect</font></p>}
                      </div>
                      <div className="form-check">
                      </div>
                    </form>                  
                    </ModalBody>
                  <ModalFooter>
                    {(this.state.changepasswordst === this.state.changepasswordnd) && this.state.changepasswordst !== undefined ?
                      (<Button color="primary" onClick={this.ProcessChangePassword}>OK</Button>)
                      : <Button color="primary"  disabled='false' onClick={this.ProcessChangePassword}>OK</Button>}

                    <Button color="secondary" onClick={this.toggleChangePassword}>Close</Button>
                  </ModalFooter>
                </Modal>

                {/* Modal logout */}
                <Modal isOpen={this.state.modallogout} toggle={this.togglelogout} className={this.props.className}>
                  <ModalHeader toggle={this.togglelogout}>Message</ModalHeader>
                  <ModalBody>
                    Logout ?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.loggedOut}>Logout</Button>
                    <Button color="secondary" onClick={this.togglelogout}>Close</Button>
                  </ModalFooter>
                </Modal>
              </div>
            ///END DETAIL FORM AREA
          ) : ''
        }
      </div>
    );
  }
}

export default Login;
