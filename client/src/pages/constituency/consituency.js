import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Card, Container } from 'react-bootstrap';
import NavigationBar from '../../components/navbar/navbar.js';
import Footer from '../../components/footer/footer.js';
import Header from '../../components/header/header.js';
import Fund from '../../components/fund/fund.js';
import TransferFunds from '../../components/transferFund/transferFund.js';
import Transactions from '../../components/transactions/transactions.js';
import Kyc from '../../components/kyc/kyc.js';
import GovtDetails from '../../contracts/GovtDetails.json';
import { db } from '../../firebase';
import './constituency.css';

function Constituency(web3) {
    const [acc, setAcc] = useState('');
    const [account, setAccount] = useState('');
    const [networkId, setNetworkId] = useState('');
    const [contract, setContract] = useState({});

    useEffect(() => {
        web3.web3.eth.getAccounts().then(async (accounts) => {
            setAccount(accounts[0]);
            web3.web3.eth.net.getId().then((result) => {
                setNetworkId(result);
                let contractAddress = GovtDetails.networks[result].address;
                let TransactContract = new web3.web3.eth.Contract(
                    GovtDetails.abi,
                    contractAddress
                );
                setContract(TransactContract);
                TransactContract.events
                    .ContractorAdded({})
                    .on('data', async (event) => {
                        console.log('HELLO');
                        let values = event.returnValues;
                        // values = (_who); contains the value of newly created contractor
                        db.collection('contractors')
                            .add({
                                contractorId: values._who,
                                date: new Date().toLocaleDateString('en-US'),
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
        web3.web3.eth.getAccounts().then(async (accounts) => {
            let account = accounts[0];
            let networkId = await web3.web3.eth.net.getId();
            let contractAddress = GovtDetails.networks[networkId].address;
            let contract = new web3.web3.eth.Contract(
                GovtDetails.abi,
                contractAddress
            );
            contract.methods
                .setContractor(acc)
                .send({ from: account })
                .then((result) => {
                    console.log(result);
                    alert('Successful');
                })
                .catch(alert);
        });
    };
    const tableData = []
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Header heading='Malviya Nagar Constituency'></Header>
            <Container className='my-5'>
                <Row>
                    <Fund name='Alloted Funds' value='2392138'></Fund>
                    <Fund name='Used Funds' value='3202'></Fund>
                </Row>
                <Row>
                    <TransferFunds web3={web3}></TransferFunds>
                    <Kyc web3={web3}></Kyc>
                </Row>

                {/* form below */}

                <div>
                    <Card className='table-card'>
                        <Card.Body>
                            <h2>Add Contractor</h2>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='0x0000000000000000'
                                            onChange={(v) => {
                                                setAcc(v.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Button
                                    type='submit'
                                    className='constituency-find-btn'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Transactions 
                        heading='Previous Funds Transfer' 
                        tableHeaders={["ContractId", "Amount"]}
                        tableData={tableData}
                        ></Transactions>
                </div>
            </Container>

            {/* form above */}

            <div className='constituency-above-footer'></div>
            <Footer></Footer>
        </div>
    );
}

export default Constituency;
