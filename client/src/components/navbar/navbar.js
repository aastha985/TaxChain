import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../pages/contexts/AuthContext';

function NavigationBar(props) {
    const { currentUser, signout } = useAuth();
    function isGovernment(){
        return true
    }
    function isConstituency(){
        return true
    }
    function isContractor(){
        return true
    }
    function isCitizen(){
        return true
    }
    // console.log("from navbar", currentUser);
    return (
        <Navbar className='color-nav fixed-top' variant='dark' expand='lg'>
            <Navbar.Brand href='/'>
                <FontAwesomeIcon className='icon' icon={faDiceD20} />
                TaxChain
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto ml-auto'>
                    {isCitizen()?
                        <Nav.Link className='nav-link' href='/citizen'>
                            Citizens
                        </Nav.Link>
                    :""}

                    {isGovernment?
                        <Nav.Link className='nav-link' href='/government'>
                            Government
                        </Nav.Link>
                    :""}
                    
                    {isConstituency?
                        <Nav.Link className='nav-link' href='/constituency'>
                            Constituency
                        </Nav.Link>
                    :""}
                    
                    {isContractor?
                        <Nav.Link className='nav-link' href='/contractor'>
                            Contractor
                        </Nav.Link>
                        :""}
                </Nav>
                <Nav.Link
                    className='nav-link'
                    href={`/${currentUser ? '' : 'login'}`}
                >
                    <Button
                        variant='outline'
                        className='btn-green'
                        onClick={currentUser ? signout : () =>{}}
                    >
                        {currentUser ? 'Logout' : 'Login'}
                    </Button>
                </Nav.Link>
                {!currentUser ? (
                    <Nav.Link className='nav-link navbar-signup' href='/signup'>
                        SignUp
                    </Nav.Link>
                ) : (
                    ''
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
