
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {auth} from '../server/firebase-config.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React,{useState,useEffect} from 'react'
import Notification from '../components/Notification.jsx';

function Register(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [signupIndicator,setIndicator] = useState(<div></div>)

    console.log(auth?.currentUser?.email)

    async function SignUp(e){

        e.preventDefault()

        try {

            await createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential) => {

                setIndicator(<Notification type="success" message="Successfully sign up!"></Notification>)
            })
            

        } catch (err) {

            console.error(err)
            setIndicator(<Notification type="danger" message="Failed to sign up! Please try again!"></Notification>)

        }

    }

    return(

        <>

            {signupIndicator}

            <div className="mt-[7rem]">
                <p className="text-4xl font-bold text-center">Register</p>
            </div>

            <div className="flex justify-center">
                <Form className="w-[90%] max-w-[30rem]" onSubmit={SignUp}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else?
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>    
            </div>
        </>

    )

}

export default Register