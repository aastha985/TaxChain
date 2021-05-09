import React, { useState } from 'react';
import { Col, Button, Form, Card } from 'react-bootstrap';
import Transact from '../../contracts/Transact.json';

import './purchaseTokens.css';

export default function PurchaseTokens(web3) {
    const [val, setValue] = useState(0);
    const handleSubmit = async (event) => {
        event.preventDefault();
        web3.web3.eth.getAccounts().then(async (accounts) => {
            let account = accounts[0];
            let networkId = await web3.web3.eth.net.getId();
            let contractAddress = Transact.networks[networkId].address;
            web3.web3.eth
                .sendTransaction({
                    from: account,
                    to: contractAddress,
                    value: val,
                })
                .then((result) => {
                    console.log(result);
                    alert('Successful');
                })
                .catch(alert);
        });
    };
    return (
        <Col md={6}>
            <Card className='pt-card'>
                <Card.Body>
                    <h4 className='pt-heading'>Purchase Tokens</h4>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Enter amount'
                                onChange={(v) => {
                                    setValue(v.target.value);
                                }}
                            />
                        </Form.Group>
                        <Button
                            className='pt-find-btn'
                            type='submit'
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
}
