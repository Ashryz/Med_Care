import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';

function MainDashboard() {
  return (
    <>
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <hr />
            <div className="side col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9 mt-3">

              <div className="container main-dashboard-container">
                <Row>
                  <Col md={4}>
                    <Card className="dashboard-card">
                      <Card.Body>
                        <Card.Title className="dashboard-card-title">Number of Appointments</Card.Title>
                        <Card.Text className="dashboard-card-text">...</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="dashboard-card">
                      <Card.Body>
                        <Card.Title className="dashboard-card-title">Total Reviews</Card.Title>
                        <Card.Text className="dashboard-card-text">...</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Card className="dashboard-card">
                      <Card.Body>
                        <Card.Title className="dashboard-card-title">Avg Rating</Card.Title>
                        <Card.Text className="dashboard-card-text">...</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>


  );
}

export default MainDashboard;