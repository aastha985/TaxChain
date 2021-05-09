import React from 'react'
import {Table, Card} from 'react-bootstrap'

function ContractTable(props) {
    return (
        <Card className="constituency-card constituency-transaction-card">
            <h4 className="constituency-transaction-heading ">
                Previous Contracts
            </h4>
            <Table
                responsive
                striped
                bordered
                hover
                className="constituency-transaction-table"
            >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>date</th>
                        <th>Contract ID</th>
                    </tr>
                </thead>
                <tbody>
                
                    {
                        props.tableData.map((item, index) => (
                            <tr key={index}>
                                <td key={0}>{item.title}</td>
                                <td key={1}>{item.description}</td>
                                <td key={3}>{item.date}</td>
                                <td key={2}>{item.work}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Card>
    )
}

export default ContractTable;