import React from "react";
import { Col, Card } from "react-bootstrap";
import "./currentTokens.css";

export default function CurrentTokens({ name, value }) {
    return (
        <Col md={6}>
            <Card className="ct-card">
                <Card.Body>
                    <h4 className="ct-heading">{name}</h4>
                    <h5 className="ct-text">{value} INR</h5>
                </Card.Body>
            </Card>
        </Col>
    );
}
