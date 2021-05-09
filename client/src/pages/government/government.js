import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import Header from '../../components/header/header.js';
import NavigationBar from '../../components/navbar/navbar.js';
import Footer from '../../components/footer/footer.js';
import Fund from '../../components/fund/fund.js';
import CreateTable from '../../components/Tables/GovernmentTable.js'
import './government.css';
import GovtAllocate from '../../contracts/GovtAllocate.json';
import AddConstituency from '../../components/addConstituency/addConstituency.js';
import { db } from '../../firebase';

export default function Government(web3) {
    console.log(web3.web3.eth);
    const [account, setAccount] = useState('');
    const [networkId, setNetworkId] = useState('');
    const [contract, setContract] = useState({});
    const [constId, setConstId] = useState('');
    const [amount, setAmount] = useState(0);
    const [tableData, setTableDate] = useState([]);

    getTableDate()

    useEffect(() => {
        web3.web3.eth.getAccounts().then(async (accounts) => {
            setAccount(accounts[0]);
            web3.web3.eth.net.getId().then((result) => {
                setNetworkId(result);
                let contractAddress = GovtAllocate.networks[result].address;
                let TransactContract = new web3.web3.eth.Contract(
                    GovtAllocate.abi,
                    contractAddress
                );
                setContract(TransactContract);
                TransactContract.events
                    .AllocationDone({})
                    .on('data', async (event) => {
                        let values = event.returnValues;
                        // values = (cName, newAmount, prevAmount);
                        db.collection('allot-funds')
                            .add({
                                amount: values.newAmount - values.prevAmount,
                                date: new Date().toLocaleDateString('en-US'),
                                constituency: values.cName,
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
    const handleTransferFunds = async (event) => {
        event.preventDefault();
        contract.methods
            .allocateFunds(constId)
            .send({ from: account, value: amount })
            .then((result) => {
                console.log(result);
                alert('SUCCESS');
            })
            .catch(alert);
    };

    async function getTableDate(){
        let data = []
        await db.collection("allot-funds").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                data.push(doc.data())
            });
        });

        setTableDate(data)
    }

    return (
        <>
            <NavigationBar></NavigationBar>
            <Header heading='Government of India'></Header>
            <Container>
                <div className='Government mb-5'>
                    <Row>
                        <Fund name='Total Funds' value='2392138'></Fund>
                        <Fund name='Used Funds' value='3202'></Fund>
                    </Row>
                    <Row>
                        <Col sm={12} md={8}>
                            {/* <Transactions 
                              heading='Transactions' 
                              tableHeaders={["ConstituencyID", "Amount", "Date"]} 
                              tableData={tableData}
                            ></Transactions> */}
                            <CreateTable heading={"Previous Transfers"} tableData={tableData}></CreateTable>


                        </Col>
                        <Col sm={12} md={4}>
                            <div className='Government-form'>
                                <Card className='table-card mt-3'>
                                    <Card.Body>
                                        <h3 className='table-heading'>
                                            Transfer Funds
                                        </h3>
                                        <div className='Government-form-wrapper'>
                                            <div className='currentFund'>
                                                <h1>25M</h1>
                                                <p>Total Funds</p>
                                            </div>
                                            <form action=''>
                                                <input
                                                    type='text'
                                                    placeholder='Enter constituency ID'
                                                    onChange={(event) => {
                                                        setConstId(
                                                            event.target.value
                                                        );
                                                    }}
                                                />
                                                <input
                                                    type='number'
                                                    placeholder='Amount'
                                                    onChange={(event) => {
                                                        setAmount(
                                                            event.target.value
                                                        );
                                                    }}
                                                />
                                                <input
                                                    type='text'
                                                    id='projectName'
                                                    placeholder='Description'
                                                />

                                                <button
                                                    type='submit'
                                                    className='shadow-md'
                                                    onClick={
                                                        handleTransferFunds
                                                    }
                                                >
                                                    TRANSFER
                                                </button>
                                            </form>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <AddConstituency web3={web3}></AddConstituency>
                    </Row>
                </div>
            </Container>
            <Footer></Footer>
        </>
    );
}



