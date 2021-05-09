import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/footer.js';
import NavigationBar from '../../components/navbar/navbar.js';
import Header from '../../components/header/header.js';
import {
    Row,
    Col,
    Button,
    Form,
    Card,
    Container,
    Alert,
    Table
} from 'react-bootstrap';
import CitizenTable from '../../components/Tables/CitizenTable.js'
import GovernmentTable from '../../components/Tables/GovernmentTable.js'
import CurrentTokens from '../../components/currentTokens/currentTokens.js';
import PurchaseTokens from '../../components/purchaseTokens/purchaseTokens.js';
import Transact from '../../contracts/Transact.json';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../../firebase';
import './citizen.css';

export default function Citizen({ web3 }) {
    const { currentUser } = useAuth();
    const [account, setAccount] = useState('');
    const [networkId, setNetworkId] = useState('');
    const [transactContract, setTransactContract] = useState('');
    const [mineMessage, setMineMessage] = useState('');
    const [tableDataCitizen, setTableDateCitizen] = useState([]);
    const [tableDataGovernment, setTableDataGovernment] = useState([]);

    getTableDateCitizen()
    getTableDateGovernment()

    var description =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam sollicitudin tempor id eu nisl nunc. Malesuada bibendum arcu vitae elementum curabitur vitae. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Nisl vel pretium lectus quam id leo in vitae turpis. A lacus vestibulum sed arcu non odio euismod. Tincidunt vitae semper quis lectus nulla. Pulvinar elementum integer enim neque volutpat ac. Tortor at risus viverra adipiscing at. Placerat in egestas erat imperdiet sed. Turpis tincidunt id aliquet risus. Sed enim ut sem viverra. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc.';
    useEffect(() => {
        web3.eth.getAccounts().then(async (accounts) => {
            setAccount(accounts[0]);
            web3.eth.net.getId().then((result) => {
                setNetworkId(result);
                let contractAddress = Transact.networks[result].address;
                let TransactContract = new web3.eth.Contract(
                    Transact.abi,
                    contractAddress
                );
                setTransactContract(TransactContract);
                TransactContract.events
                    .TaxPaid({})
                    .on('data', async (event) => {
                        let values = event.returnValues;
                        // values = (_who, taxBefore, taxAfter);
                        db.collection('tax-payments')
                            .add({
                                amount: values.taxAfter - values.taxBefore,
                                date: new Date().toLocaleDateString('en-US'),
                                payerAddress: values._who,
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
    const handlePayTax = async (event) => {
        event.preventDefault();
        let userBlockChainAddress = await getBlockChainAddress(
            currentUser.email
        );
        if (account.toLowerCase() != userBlockChainAddress.toLowerCase()) {
            alert('NOT your account');
            return;
        }
        transactContract.methods
            .payTax(1)
            .send({ from: account })
            .then((result) => {
                console.log(result);
                alert('Done');
                setMineMessage('Transaction Completed');
            })
            .catch(alert);
    };

    async function getTableDateCitizen(){
        let data = []
        await db.collection("tax-payments").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                data.push(doc.data())
            });
        });

        setTableDateCitizen(data)
    }
    async function getTableDateGovernment(){
        let data = []
        await db.collection("allot-funds").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                data.push(doc.data())
            });
        });

        setTableDataGovernment(data)
    }
    

    return (
        <div className=''>

            <NavigationBar></NavigationBar>
            <Header heading='Citizen: Rohan Singh'></Header>
            <Container>
                <Row>
                    <PurchaseTokens web3={web3}></PurchaseTokens>
                    <CurrentTokens
                        name='Current Tokens'
                        value='2392138'
                    ></CurrentTokens>
                </Row>
            </Container>
            <div className='PayTax my-5'>
                <Row>
                    <Col sx={12} md={8} id='table'>
                        <div className='payTax-table'>
                            <CitizenTable tableData={tableDataCitizen}></CitizenTable>
                        </div>
                    </Col>
                    <Col sx={12} md={4}>
                        <div>
                            <Card className='table-card'>
                                <Card.Body>
                                    <h2>Pay Tax</h2>
                                    {mineMessage ? (
                                        <Alert
                                            variant='success'
                                            className='mb-5'
                                        >
                                            {mineMessage}
                                        </Alert>
                                    ) : (
                                        ''
                                    )}

                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    type='number'
                                                    placeholder='Amount'
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Button
                                            type='submit'
                                            className='constituency-find-btn'
                                            onClick={handlePayTax}
                                        >
                                            Submit
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col className="mt-5">
                        <GovernmentTable heading={"Track You Tax"} tableData={tableDataGovernment}></GovernmentTable>
                    </Col>
                </Row>
            </div>
            <Footer></Footer>
        </div>
    );
}

async function getBlockChainAddress(email) {
    let docRef = db.collection('users').doc(email);
    let inter = await docRef.get();
    if (inter.exists) return inter.data().blockChainAddress;
    else return null;
}
