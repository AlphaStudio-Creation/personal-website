
import { useEffect, useState } from 'react'
import {auth,db} from '../server/firebase-config.js'
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Notification from '../components/Notification.jsx';

function CommunityPosts(){

    const [communitypostslist,setPosts] = useState([])
    const [titleInput,setTitle] = useState("")
    const [descInput,setDesc] = useState("")
    const [indicator,setIndicator] = useState([])

    const CommunityPostsRef = collection(db,"communityposts")

    useEffect(() => {

        async function getCommunityPosts(){

            try {

                const data = await getDocs(CommunityPostsRef)
                const OrganisedData = data.docs.map((doc) => (

                    {...doc.data(),id: doc.id}

                ))

                const filteredData = OrganisedData.filter((Data) => Data.approved == true)

                setPosts(filteredData)

            } catch (err) {

                console.error(err)

            }

        }

        getCommunityPosts()

    },[])

    async function handleSubmit(e){

        e.preventDefault()

        try {

            await addDoc(CommunityPostsRef,{

                CreatedAt: serverTimestamp(),
                approved: false,
                approvedby: "",
                author: auth.currentUser.email,
                desc: descInput,
                title: titleInput,
                userId: auth.currentUser.uid,

            })

            setIndicator(<Notification type="success" message="Successfully Requested!"></Notification>)

        } catch (err) {

            console.error(err)

            setIndicator(<Notification type="danger" message="Failed to request! Please try again later!"></Notification>)

        }

    }

    return(

        <>
        
            {indicator}

            <div className="mt-[7rem]">
                <p className="text-4xl font-bold text-center">Community Posts</p>
            </div>

            <div className="flex justify-center mt-[2rem]">
                <Form className="w-[90%] max-w-[30rem]" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" onChange={(e) => setDesc(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Request
                    </Button>
                </Form>    
            </div>

            {(communitypostslist.length - 1) == 0 ?

                <div className="flex flex-col items-center mt-[3.5rem] gap-y-[1rem]">

                    {communitypostslist.map((CommunityPostData,index) => {

                        return(
                            
                            <div key={index} className="w-[90%] bg-gray-100 shadow-lg rounded-lg p-[2rem]">
                                <div key={index}>

                                    <p className="text-4xl text-center font-bold">{CommunityPostData.title}</p>
                                    <p className="text-sm text-center text-gray-400">ID: {CommunityPostData.id}</p>
                                    <p className="text-sm text-center text-gray-400">AUTHOR: {CommunityPostData.author}</p>
                                    <p className="text-md text-center pt-[3rem]">{CommunityPostData.desc}</p>
                                    <p className="text-sm text-center text-green-600">APPROVED BY: {CommunityPostData.approvedby}</p>

                                </div>
                            </div>
                        )

                    })}

                </div>

            : <p className="text-xl text-center pt-[15rem] text-gray-400">There is no post so far.Post one here now!</p>}
        
        </>

    )

}

export default CommunityPosts