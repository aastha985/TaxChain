import React from "react";
import { Container, Col } from "react-bootstrap";

import "./header.css";

function Header({ heading }) {
    return (
        <div className="header-black-bg">
            <Container>
                <Col md={12} className="header-above">
                    <h2 className="header-heading">{heading}</h2>
                </Col>
            </Container>
        </div>
    );
}

export default Header;
