
import { useRouteError } from "react-router-dom"

function ErrorPage(){

    var error = useRouteError()
    console.error(error)

    return(

        <>
            <div className="flex flex-col items-center mt-[20rem]">
                <p className="text-4xl font-bold text-red-400">Oh! There is a error happened!</p>
                <p>{error.status} : {error.data}</p>
            </div>
        </>

    )

}

export default ErrorPage