import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Contract({ title, description, date, contractID, amount }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <tr>
                <td>{date}</td>
                <td>{contractID}</td>
                <td>{amount}</td>
                <td>
                    <a onClick={handleShow}>{title}</a>
                </td>
            </tr>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="contract-bold-txt">
                        Description
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{description}</Modal.Body>
                <Modal.Footer>
                    <Button
                        className="contract-close-btn"
                        variant="success"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Contract;
