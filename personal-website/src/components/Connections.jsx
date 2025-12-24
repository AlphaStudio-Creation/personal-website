
const CONNECTIONS_LOGO = [

    ["http://localhost:5173/instagram.png","https://www.instagram.com/ansonrework/"],
    ["http://localhost:5173/github.png","https://github.com/AlphaStudio-Creation"],
    ["http://localhost:5173/threads.png","https://www.threads.com/@ansonrework"]

]

function Connections(){

    return(

        <>
            
            <div className="flex justify-center">

                <p className="text-4xl font-bold">My Connections!</p>

            </div>

            <div className="flex justify-center mt-[1rem]">
                <div className="flex gap-[1.5rem]">

                    {CONNECTIONS_LOGO.map((ConnectionsData,index) => {

                        return(
                            <div key={index}>
                                <a href={ConnectionsData[1]}><img src={ConnectionsData[0]} alt={ConnectionsData[0]} key={index} className="w-[3rem]"></img></a>
                            </div>
                        )

                    })}

                </div>
            </div>
            
        </>

    )

}

export default Connections