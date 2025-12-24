
import { useEffect,useState } from 'react'
import {auth,db} from '../server/firebase-config.js'
import { getDocs,collection, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Notification from '../components/Notification.jsx';

function AddCreations(){

    var AdminList = []
    
    const [creationNameInput,setName] = useState("")
    const [creationLinkInput,setLink] = useState("")
    const [indicator,setIndicator] = useState(<div></div>)
    const [creationsList,setList] = useState([])

    const AdminCollectionRef = collection(db,"admins")
    const CreationsRef = collection(db,"creations")
    const Navigate = useNavigate()

    useEffect(() => {

        async function getAdminList(){

            try{

                const data = await getDocs(AdminCollectionRef)
                const filteredData = data.docs.map((doc) => (

                    {...doc.data(),id: doc.id}

                ))

                AdminList = filteredData

                if (auth.currentUser == null) Navigate("/")

                const isAdmin = AdminList.some(admin => admin.email === auth.currentUser.email)

                if (isAdmin == false) Navigate("/")

            } catch (err) {

                console.error(err)

            }

        }

        async function getCreationsList(){

            try {

                const data = await getDocs(CreationsRef)
                const filteredData = data.docs.map((doc) => (

                    {...doc.data(),id: doc.id}

                ))

                setList(filteredData)

            } catch (err) {

                console.error(err)

            }

        }

        getCreationsList()
        getAdminList()

    },[indicator])

    async function handleCreationDelete(id){

        const DeleteDoc = doc(db,"creations",id)
        await deleteDoc(DeleteDoc)

        setIndicator(<Notification type="success" message="Deleted creation from database!"></Notification>)

    }

    async function handleSubmit(e){

        e.preventDefault()

        try {

            await addDoc(CreationsRef,{

                creationName: creationNameInput,
                creationLink: creationLinkInput,
                userId: auth.currentUser.uid,

            })

            setIndicator(<Notification type="success" message="Added creation to database!"></Notification>)

        } catch (err) {

            console.error(err)

            setIndicator(<Notification type="danger" message="Failed to add creation to database"></Notification>)

        }

    }

    return(

        <>
        
            {indicator}

            <div className="mt-[7rem]">
                <p className="text-4xl font-bold text-center">Manage Creations</p>
            </div>

            <div className="flex justify-center">
                <Form className="w-[90%] max-w-[30rem]" onSubmit={handleSubmit}>
                     <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Creations Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Creations Link</Form.Label>
                        <Form.Control type="text" placeholder="Enter link" onChange={(e) => setLink(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                                Submit
                    </Button>
                </Form>    
            </div>

            <div className="flex flex-col items-center mt-[3.5rem] gap-y-[1rem]">

                {creationsList.map((CreationsData,index) => {

                    return(
                        
                        <div key={index} className="w-[90%] bg-gray-100 shadow-lg rounded-lg pt-[2rem] pb-[2rem]">
                            <div key={index}>

                                <p className="text-3xl font-bold text-center">{CreationsData.creationName}</p>
                                <a href={CreationsData.creationLink} className="text-center"><p>{CreationsData.creationLink}</p></a>
                                    
                                <div className="flex justify-center">
                                    <Button variant="danger" onClick={() => handleCreationDelete(CreationsData.id)}>
                                        Delete Creation
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )

                })}

            </div>

        </>

    )

}

export default AddCreations