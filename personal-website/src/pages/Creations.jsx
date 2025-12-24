
import { useEffect, useState } from "react"
import { auth,db } from "../server/firebase-config"
import { getDocs,collection } from 'firebase/firestore'

function Creations(){

    const [CreationsList,setCreationsList] = useState([])

    const CreationsCollectionRef = collection(db,"creations")

    useEffect(() => {

        async function getCreationsList() {

            try{

                const data = await getDocs(CreationsCollectionRef)

                const filteredData = data.docs.map((doc) => (

                    {...doc.data(),id: doc.id}

                ))

                setCreationsList(filteredData)

            } catch (err) {

                console.error(err)

            }
            
        }

        getCreationsList()

    },[])

    return(

        <>
        
            <p className="text-5xl font-bold text-center pt-[2rem]">My Creations!</p>

            <div className="flex flex-col items-center mt-[3.5rem] gap-y-[1rem]">

                {CreationsList.map((CreationsData,index) => {

                    return(
                        
                        <div key={index} className="w-[90%] bg-gray-100 shadow-lg rounded-lg p-[2rem]">
                            <div key={index}>

                                <p className="text-3xl font-bold text-center">{CreationsData.creationName}</p>
                                <a href={CreationsData.creationLink} className="text-center"><p>{CreationsData.creationLink}</p></a>

                            </div>
                        </div>
                    )

                })}

            </div>
        </>

    )

}

export default Creations