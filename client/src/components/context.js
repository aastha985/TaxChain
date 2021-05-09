import React, { useState } from 'react';
import { Web3JS } from './context/context.js';
import getWeb3 from './getWeb3';
const InfoContainer = (props) => {
    const [web3, setWeb3] = useState({});
    useEffect(() => {
        getWeb3().then((result) => setWeb3(result));
    }, []);
    return (
        <div>
            <Web3JS.Provider value={web3}></Web3JS.Provider>
        </div>
    );
};
export default InfoContainer;
