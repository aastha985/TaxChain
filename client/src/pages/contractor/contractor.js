import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Card,
    Form,
    Button,
} from 'react-bootstrap';
import NavigationBar from '../../components/navbar/navbar.js';
import Footer from '../../components/footer/footer.js';
import Header from '../../components/header/header.js';
import GenerateContract from '../../components/generateContract/generateContract.js';
import ContractTable from '../../components/Tables/ContractTable.js'
import { db } from '../../firebase';


import './contractor.css';

function Contractor(web3) {
    const [tableData, setTableDate] = useState([]);

    getTableDate()
    
    async function getTableDate(){
        let data = []
        await db.collection("contracts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                
                // if(doc.data().owner === )
                data.push(doc.data())
            });
        });

        setTableDate(data)
    }

    return (
        <div>
            <NavigationBar></NavigationBar>
            <Header heading='Contractor: Rahul Sharma'></Header>
            <Container>
                <Row>
                    <GenerateContract web3={web3}></GenerateContract>
                    <Col md={12}>
                        <Card className='table-card'>
                            <Card.Body>
                                <ContractTable tableData={tableData}></ContractTable>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    );
}

export default Contractor;
