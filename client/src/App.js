import React, { Component, useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/home/home.js';
import SignUp from './pages/forms/signup';
import Login from './pages/forms/login';
import Citizen from './pages/citizen/citizen';
import GovtDashboard from './pages/government/government.js';
import Constituency from './pages/constituency/consituency.js';
import Contractor from './pages/contractor/contractor.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import getWeb3 from './getWeb3';
import Web3JS from './services/context';
import { AuthProvider } from './pages/contexts/AuthContext';

function App() {
    const [loaded, setLoaded] = useState(false);
    const [web3, setWeb3] = useState({});
    const [accounts, setAccounts] = useState({});
    const [networkId, setNetworkId] = useState({});

    useEffect(() => {
        const handler = async () => {
            let Web3 = await getWeb3();
            setWeb3(Web3);
            let Accounts = await Web3.eth.getAccounts();
            setAccounts(Accounts);
            let NetworkId = await Web3.eth.net.getId();
            setNetworkId(NetworkId);
        };
        try {
            handler();
            setLoaded(true);
        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    }, []);

    if (!loaded) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <>
            <AuthProvider>
                <Renderer web3={web3} />
            </AuthProvider>
        </>
    );
}

function Renderer(params) {
    return (
        <Router>
            <div className='App'>
                <Switch>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/signup' component={SignUp}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route
                        path='/citizen'
                        render={() => <Citizen web3={params.web3} />}
                    ></Route>
                    <Route
                        path='/government/'
                        render={() => <GovtDashboard web3={params.web3} />}
                    ></Route>
                    <Route
                        path='/constituency'
                        render={() => <Constituency web3={params.web3} />}
                    ></Route>
                    <Route
                        path='/contractor'
                        render={() => <Contractor web3={params.web3} />}
                    ></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
