
import { useEffect, useState } from 'react'
import {auth,db} from '../server/firebase-config.js'
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Notification from '../components/Notification.jsx';
import { useNavigate } from 'react-router-dom';

function ManageCommunityPosts(){

    var AdminList = []
    const [communitypostslist,setPosts] = useState([])
    const [indicator,setIndicator] = useState([])

    const AdminCollectionRef = collection(db,"admins")
    const CommunityPostsRef = collection(db,"communityposts")

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

        async function getCommunityPosts(){

            try {

                const data = await getDocs(CommunityPostsRef)
                const OrganisedData = data.docs.map((doc) => (

                    {...doc.data(),id: doc.id}

                ))

                const filteredData = OrganisedData.filter((Data) => Data.approved == false)

                setPosts(filteredData)

            } catch (err) {

                console.error(err)

            }

        }

        getCommunityPosts()
        getAdminList()

    },[indicator])

    async function handleApproved(id){

        try {

            const UpdateDoc = doc(db,"communityposts",id)
            await updateDoc(UpdateDoc,{

                approved: true,
                approvedby: auth.currentUser.email,
                userId: auth.currentUser.uid,

            })

            setIndicator(<Notification type="success" message="Approved post!"></Notification>)

        } catch (err) {

            console.error(err)

            setIndicator(<Notification type="danger" message="Failed to approve the post!"></Notification>)

        }

    }

    async function handleDeclined(id){

        try{

            const DeleteDoc = doc(db,"communityposts",id)
            await deleteDoc(DeleteDoc)

            setIndicator(<Notification type="success" message="Declined post!"></Notification>)

        } catch (err) {

            console.error(err)

            setIndicator(<Notification type="danger" message="Failed to decline the post!"></Notification>)

        }

    }

    return(

        <>
        
            {indicator}

            <div className="mt-[7rem]">
                <p className="text-4xl font-bold text-center">Manage Community Posts</p>
            </div>

            {(communitypostslist.length - 1) >= 0 ?

                
                <div className="flex flex-col items-center mt-[3.5rem] gap-y-[1rem]">

                    {communitypostslist.map((CommunityPostData,index) => {


                        return(
                            
                            <div key={index} className="w-[90%] bg-gray-100 shadow-lg rounded-lg p-[2rem]">
                                <div key={index}>

                                    <p className="text-4xl text-center font-bold">{CommunityPostData.title}</p>
                                    <p className="text-sm text-center text-gray-400">ID: {CommunityPostData.id}</p>
                                    <p className="text-sm text-center text-gray-400">AUTHOR: {CommunityPostData.author}</p>
                                    <p className="text-md text-center pt-[3rem]">{CommunityPostData.desc}</p>

                                    <div className="flex justify-center gap-x-[1rem]">
                                        <Button variant="success" onClick={() => handleApproved(CommunityPostData.id)}>
                                            Approved
                                        </Button>

                                        <Button variant="danger" onClick={() => handleDeclined(CommunityPostData.id)}>
                                            Declined
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            
                        )

                    })}

                </div>

            : <p className="text-xl text-center pt-[15rem] text-gray-400">There is no post so far.</p>}
        
        </>

    )

}

export default ManageCommunityPosts