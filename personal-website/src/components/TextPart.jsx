
function TextPart(props){

    return(

        <>
            <div className="flex flex-col items-center">
                <p className="text-4xl font-bold w-[90%] text-gray-600">{props.title}</p>
                <p className="text-lg w-[90%]">{props.desc}</p>
            </div>
        </>

    )

}

export default TextPart