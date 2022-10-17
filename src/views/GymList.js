import React, { useEffect, useState } from "react";
import axios from "axios";
// const axios = require("axios");

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const BASE_URL = "http://13.127.203.70:8093/gym/getall";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};
function GymList() {
  const [gymList, setGymList] = useState([]);

  const getList = () => {
    var config = {
      method: "get",
      url: BASE_URL,
      headers: headers,
    };
    axios(config)
      .then(function (response) {
        console.log(response);
        setGymList(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getList();
  });

  const gymListItems = gymList.map((item) => (
    <tr>
      <td>{item.logo}</td>
      <td>{item.name}</td>
      <td>{item.location}</td>
      <td>
        {item.latitude}/{item.longitude}
      </td>
      <td>{item.type}</td>
    </tr>
  ));

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">GYMs</Card.Title>
                <p className="card-category">List of gymnassium</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {gymList.length > 0 && (
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Logo</th>
                        <th className="border-0">Name</th>
                        <th className="border-0">Location</th>
                        <th className="border-0">Lat/Lon</th>
                        <th className="border-0">Type</th>
                      </tr>
                    </thead>
                    <tbody>{gymListItems}</tbody>
                  </Table>
                )}
                {gymList.length == 0 && (
                  <div className="px-5">No gyms found in our records.</div>
                )}
                ;
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GymList;
