
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React,{useState} from "react"
import { auth } from "../server/firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth"
import Notification from '../components/Notification';

function Login(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loginIndicator,setIndicator] = useState(<div></div>)

    async function Login(e){

        e.preventDefault()

        try{

            await signInWithEmailAndPassword(auth,email,password)
            .then((userCredential) => {

                setIndicator(<Notification type="success" message="Successfully Login!"></Notification>)

            })

        } catch(err) {

            if (err.code == "auth/invalid-credential"){

                setIndicator(<Notification type="danger" message="Incorrect email or password! Please try again!"></Notification>)

            } else if (err.code == "auth/too-many-requests"){

                setIndicator(<Notification type="danger" message="Too many request! Please try again later!"></Notification>)

            }

        }

    }

    return(

        <>
        
            {auth.currentUser == null ? 

                <>

                    {loginIndicator}

                    <div className="mt-[7rem]">
                        <p className="text-4xl font-bold text-center">Login</p>
                    </div>

                    <div className="flex justify-center">
                        <Form className="w-[90%] max-w-[30rem]" onSubmit={Login}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
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

                    <div className="mt-[7rem]">
                        <p className="text-sm text-gray-400 font-bold text-center">Create an account? <a href="/register">Click me!</a></p>
                    </div>

                </>

            : <><Notification type="success" message="You have already logged in to the website!"></Notification></>}

        </>

    )

}

export default Login