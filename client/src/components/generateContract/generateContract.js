import React, { useState, useEffect } from 'react';
import { Col, Button, Form, Card } from 'react-bootstrap';
import './generateContract.css';
import Contractor from '../../contracts/Contractor.json';
import { db } from '../../firebase';

function GenerateContract(web3) {
    const [account, setAccount] = useState('');
    const [networkId, setNetworkId] = useState('');
    const [contract, setContract] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        web3.web3.web3.eth.getAccounts().then(async (accounts) => {
            setAccount(accounts[0]);
            web3.web3.web3.eth.net.getId().then((result) => {
                setNetworkId(result);
                let contractAddress = Contractor.networks[result].address;
                let TransactContract = new web3.web3.web3.eth.Contract(
                    Contractor.abi,
                    contractAddress
                );
                setContract(TransactContract);
                TransactContract.events
                    .WorkCreated({})
                    .on('data', async (event) => {
                        let values = event.returnValues;
                        // values = (owner, _work);
                        db.collection('contracts')
                            .add({
                                owner: values.owner,
                                date: new Date().toLocaleDateString('en-US'),
                                work: values._work,
                                title: title,
                                description: description
                            })
                            .then((docRef) => {
                                console.log(
                                    'Document written with ID: ',
                                    docRef.id
                                );
                            })
                            .catch((error) => {
                                console.error(
                                    'Error writing document: ',
                                    error
                                );
                                // setError('Error writing document:');
                            });
                    });
            });
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        web3.web3.web3.eth.getAccounts().then(async (accounts) => {
            let account = accounts[0];
            let networkId = await web3.web3.web3.eth.net.getId();
            let contractAddress = Contractor.networks[networkId].address;
            let contract = new web3.web3.web3.eth.Contract(
                Contractor.abi,
                contractAddress
            );
            contract.methods
                .createNewWork()
                .send({ from: account })
                .then((result) => {
                    console.log(result);
                    alert('SUCCESS');
                })
                .catch(alert);
        });
    };
    return (
        <>
            <Col md={2}></Col>
            <Col md={8}>
                <Card className='gc-card'>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Contract Title'
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Contract Description'
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Button
                            className='constituency-form-button-green'
                            type='submit'
                            onClick={handleSubmit}
                        >
                            Generate Contract
                        </Button>
                    </Form>
                </Card>
            </Col>
            <Col md={2}></Col>
        </>
    );
}

export default GenerateContract;
