import React from "react";
import { Col, Card } from "react-bootstrap";

import "./fund.css";

function Fund({ name, value }) {
    return (
        <Col md={6}>
            <Card className="fund-card">
                <Card.Body>
                    <h4 className="fund-heading">{name}</h4>
                    <h5 className="fund-text">{value} INR</h5>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Fund;
