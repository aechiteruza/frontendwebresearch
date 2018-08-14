import React, { Component } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Modal, Button, Card, CardBody, CardFooter, Col, Container, Form, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
class Register extends Component {
  constructor() {
    super();
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleDuplicateUser = this.toggleDuplicateUser.bind(this);
    this.SuccessRegister = this.SuccessRegister.bind(this);
    this.checkduplicateusername = this.checkduplicateusername.bind(this);

    this.state = {
      firstname: undefined,
      lastname: undefined,
      username: undefined,
      email: undefined,
      password: undefined,
      repeatpassword: undefined,
      signUp: {
        success: undefined,
        message: undefined
      },
      users: undefined,
      error: undefined,
      modal: false,
      modalDup: false,
      successregister: false,
    }

  }

  /*
  Register Form Area
  */
  passwordCheck(e) {
    e.preventDefault();
    console.log(this.refs.password.value)

    console.log(this.refs.repeatpassword.value)

  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  SuccessRegister() {
    this.setState({
      successregister: !this.state.successregister,
    });
  }

  toggleDuplicateUser() {
    this.setState({
      modalDup: !this.state.modalDup,
    });
  }

  checkduplicateusername() {
    let dataToSend = {
      userData: {
        username: this.refs.username.value,
      }
    };
    let url = 'http://localhost:3000/auth/checkuser';
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
          this.toggleDuplicateUser()
          this.refs.password.value = '';
          this.refs.repeatpassword.value = '';
        } else {
          let pwd = this.refs.password.value;
          let rpwd = this.refs.repeatpassword.value;
          let dataToSend = {
            userData: {
              firstname: this.refs.firstname.value,
              lastname: this.refs.lastname.value,
              username: this.refs.username.value,
              email: this.refs.email.value,
              password: pwd,
            },

          };
          if (pwd === rpwd) {
            let url = 'http://localhost:3000/users/register';

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
                  this.setState({
                    ...this.state,
                    signUp: {
                      success: true,
                      message: responseJson.message
                    }
                  });

                } else {
                  this.setState({
                    ...this.state,
                    signUp: {
                      success: false,
                      message: responseJson.message
                    }
                  });
                }
              }).catch(err => this.setState({ error: err }));

            this.refs.firstname.value = '';
            this.refs.lastname.value = '';
            this.refs.username.value = '';
            this.refs.email.value = '';
            this.refs.password.value = '';
            this.refs.repeatpassword.value = '';
            this.SuccessRegister()
          } else {
            this.setState({
              modal: !this.state.modal,
            });
            this.refs.password.value = '';
            this.refs.repeatpassword.value = '';
          }




        }
      }).catch(err => this.setState({ error: err }));

  }


  handleSignUpSubmit(e) {
    e.preventDefault();
    let pwd = this.refs.password.value;
    let rpwd = this.refs.repeatpassword.value;
    let dataToSend = {
      userData: {
        firstname: this.refs.firstname.value,
        lastname: this.refs.lastname.value,
        username: this.refs.username.value,
        email: this.refs.email.value,
        password: pwd,
      },

    };
    if (pwd === rpwd) {
      let url = 'http://localhost:3000/users/register';

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
            this.setState({
              ...this.state,
              signUp: {
                success: true,
                message: responseJson.message
              }
            });

          } else {
            this.setState({
              ...this.state,
              signUp: {
                success: false,
                message: responseJson.message
              }
            });
          }
        }).catch(err => this.setState({ error: err }));

      this.refs.firstname.value = '';
      this.refs.lastname.value = '';
      this.refs.username.value = '';
      this.refs.email.value = '';
      this.refs.password.value = '';
      this.refs.repeatpassword.value = '';
    } else {
      this.setState({
        modal: !this.state.modal,
      });
      this.refs.password.value = '';
      this.refs.repeatpassword.value = '';
    }


  }


  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }
  handleRepeatPasswordChange(e) {
    this.setState({
      repeatpassword: e.target.value
    })
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">

                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <form onSubmit={this.checkduplicateusername}>
                    <div className="form-group">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-user"></i></InputGroupText>
                        </InputGroupAddon>
                        <input type="text" ref="firstname" className="form-control" id="firstname" placeholder="Firstname" />
                        <input type="text" ref="lastname" className="form-control" id="lastname" placeholder="Lastname" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="icon-user"></i></InputGroupText>
                        </InputGroupAddon>
                        <input type="username" ref="username" className="form-control" id="username" placeholder="Username" autoComplete="Username" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <input type="email" ref="email" className="form-control" id="email" placeholder="Email" autoComplete="Email" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input type="password" ref="password" className="form-control" id="password" placeholder="Password" autoComplete="Password" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input type="password" ref="repeatpassword" className="form-control" id="repeatpassword" placeholder="Repeat Password" autoComplete="New-Password" />
                      </InputGroup>
                      {/*}
                      <input type="text" ref="firstname" className="form-control" id="firstname"
                        placeholder="Firstname" />
                      <input type="text" ref="lastname" className="form-control" id="lastname"
                        placeholder="Lastname" />
                
                      <input type="email" ref="email" className="form-control" id="email" placeholder="Email" autoComplete="email" />
                      <input type="password" ref="password" className="form-control" id="password" placeholder="Password" autoComplete="password" />
                      <input type="password" ref="repeatpassword" className="form-control" id="repeatpassword" placeholder="Repeat password" autoComplete="new-password" />
                    {*/}
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Create Account</button>
                    </div>
                  </form>
                  {/* Password not same */}
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Message</ModalHeader>
                    <ModalBody>
                      Please put password and re-password with same words.
                  </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                  </Modal>
                  {/* Duplicate username */}
                  <Modal isOpen={this.state.modalDup} toggle={this.toggleDuplicateUser} className={this.props.className}>
                    <ModalHeader toggle={this.toggleDuplicateUser}>Message</ModalHeader>
                    <ModalBody>
                      Username already exists.
                  </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggleDuplicateUser}>Close</Button>
                    </ModalFooter>
                  </Modal>
                  {/* Success register */}
                  <Modal isOpen={this.state.successregister} toggle={this.SuccessRegister} className={this.props.className}>
                    <ModalHeader toggle={this.SuccessRegister}>Message</ModalHeader>
                    <ModalBody>
                      Register success.
                  </ModalBody>
                    <ModalFooter>
                      <Link to='/Pages/Login'><Button color="secondary" onClick={this.SuccessRegister}>Close</Button></Link>
                    </ModalFooter>
                  </Modal>
                  {/*
                  <form onSubmit={this.passwordCheck}>
                    <div className="form-group">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input type="text" ref="firstname" className="form-control" id="firstname"
                        placeholder="Firstname" />
                        <input type="text" ref="lastname" className="form-control" id="lastname"
                        placeholder="Lastname" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <input type="email" ref="email" className="form-control" id="email" placeholder="Email" autoComplete="email"  />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <input type="password" ref="password" className="form-control" id="password"  placeholder="Password" autoComplete="password"/>
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <input type="password" ref="repeatpassword" className="form-control" id="repeatpassword"  placeholder="Repeat password" autoComplete="new-password"/>
                  </InputGroup>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Create Account</button>
                    </div>
                  </form>
*/}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
