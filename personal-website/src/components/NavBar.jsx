


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { auth } from '../server/firebase-config';
import { signOut } from 'firebase/auth';
import { useState } from 'react';

function NavBar(){

    async function handleLogout(e){

        try{

            await signOut(auth)
            .then(() => {

                console.log("signed out")

            })

        } catch (err) {

            console.error(err)

        }
        

    }

    return(

        <>

            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">AnsonRE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/creations">Creations</Nav.Link>
                            <Nav.Link href="/communityposts">Community Posts</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                            {auth.currentUser?.email == "sunshinghin2@gmail.com" ? <Nav.Link href="/admin-manage-creations">MANAGE CREATIONS</Nav.Link> : <></>}
                            {auth.currentUser?.email == "sunshinghin2@gmail.com" ? <Nav.Link href="/admin-manage-communityposts">MANAGE POSTS</Nav.Link> : <></>}
                        </Nav>

                        {auth.currentUser != null ?
                            <Navbar.Text>Welcome! {auth.currentUser?.email} <div className="text-red-200"><button onClick={(e) => handleLogout(e)}>Logout</button></div></Navbar.Text>
                        : <Navbar.Text>Build everything from scratch!</Navbar.Text>}

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>


    )

}

export default NavBar