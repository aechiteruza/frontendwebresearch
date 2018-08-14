import React, { Component } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Modal, Button, Card, CardBody, CardGroup, Col, Container, Form, Badge, DropdownItem, DropdownMenu, DropdownToggle, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
class Main extends Component {

  render() {
    return (
      <div className="app flex-row align-items-top">
                <Container>
                  <Row className="justify-content-left">
                    <Col md="8">
                      <Card className="mx-8">
                        <CardBody className="p-8">
                          <Form>
                            <div align='center'>
                          <img src={'assets/img/bannermqtt.jpg'} alt="Cloud MQTT Platform" />
                          </div>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
    );
  } 

}

export default Main;
