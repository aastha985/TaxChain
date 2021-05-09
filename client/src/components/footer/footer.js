import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./footer.css";

function Footer() {
    return (
        <div className="footer">
            <Container>
                <Row>
                    <Col md={12} className="footer-text">
                        Made with
                        <FontAwesomeIcon
                            className="icon-heart"
                            icon={faHeart}
                        />
                        in India by{" "}
                        <a
                            className="footer-name"
                            href="https://github.com/aastha985"
                        >
                            Aastha
                        </a>
                        ,{" "}
                        <a
                            className="footer-name"
                            href="https://github.com/agrim19"
                        >
                            Agrim
                        </a>{" "}
                        and{" "}
                        <a
                            className="footer-name"
                            href="https://github.com/tushar19340"
                        >
                            Tushar
                        </a>
                    </Col>
                    <Col className="footer-text-copyright">
                        Copyright © 2021 | TaxChain
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
