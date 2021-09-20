import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Notify.css";
const Notify = (props) => {
  const [devise, setDevise] = useState([]);

  const config = {
    name: "omar faruk",
    email: "ronymaha@gmail.com",
    repoUrl: "",
    message: "This is a nice and awesome project",
  };



  /**
   * @param {NULL}
   * @return string/success message
   */
  const notifyHandler = () => {
    // Notify button functionality
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    };
    let url = "http://35.201.2.209:8000/notify";
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };


  /**
   * Initial effect
   */
  useEffect(() => {
    const url = `http://35.201.2.209:8000/devices`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDevise(data.devices);
        let count = data.devices.length;
        data.devices.map((v) => {
          const el = document.querySelector(`.circle-container ul`);
          Array.from(el.children).forEach((li, idx) => {
            const rot = (idx * 360) / count;
            li.style.transform = `translate(-50%, -50%) rotate(${rot}deg) translateY(-2.7rem) rotate(-${rot}deg)`;
          });
        });
      });
  }, []);

  return (
    <div className="body">
      <Container className="bodyContaint">
        <Row className=" mt-5 ">
          <Col className=" p-0 ">
            <div className="circle-container text-center">
              <span className="counter fs-2 text-light">2</span>
              <ul>
                {devise.map((devise, index) => (
                  <li>
                    <span className="spanvalue">{index}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer d-flex justify-content-center ">
              <Button
                onClick={notifyHandler}
                className="text-uppercase border-0 buttonStyl rounded "
                type="submit"
              >
                Notify
              </Button>
              <Button
                onClick={() => props.logoutHandler()}
                className="text-uppercase border-0  buttonStyl rounded bg-dark text-light"
                type="submit"
              >
                Log out
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Notify;
