
import Alert from 'react-bootstrap/Alert';

function Notification(props){

    return(

        <>
            <div className="flex justify-center mt-[5rem]">
                <Alert className="w-[90%] max-w-[30rem]" variant={props.type}>
        
                    {props.message}
                                
                </Alert> 
            </div> 
        </>
    )

}

export default Notification