import React, { useState } from 'react';
import { Col, Button, Form, Card } from 'react-bootstrap';

function TransferFunds(web3) {
    const [toAccount, setToAccount] = useState('');
    const [toValue, setToValue] = useState(0);
    const handleSubmit = async (event) => {
        event.preventDefault();
        web3.web3.web3.eth.getAccounts().then(async (accounts) => {
            let account = accounts[0];
            web3.web3.web3.eth
                .sendTransaction({
                    from: account,
                    value: toValue,
                    to: toAccount,
                })
                .then((result) => {
                    console.log(result);
                    alert('SUCCESS');
                })
                .catch(alert);
        });
    };
    return (
        <Col md={6}>
            <Card className='constituency-card  constituency-form-card'>
                <Form>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Contract ID'
                            onChange={(event) => {
                                setToAccount(event.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type='number'
                            placeholder='Amount'
                            onChange={(event) => {
                                setToValue(event.target.value);
                            }}
                        />
                    </Form.Group>
                    <Button
                        className='constituency-form-button-green'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Transfer Funds
                    </Button>
                </Form>
            </Card>
        </Col>
    );
}

export default TransferFunds;
