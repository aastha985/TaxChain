import React from "react";
import Contract from "../../components/contract/contract.js";

function TransactionRow(props) {

    return (

        <tr>
            {props.row.map((item) => (
                <td key={item}>{item}</td>
            ))}
        </tr>
    );
}

export default TransactionRow;
