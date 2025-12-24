
function Section(props){

    return(

        <>
            <div className="flex justify-center">
                <div className="bg-gray-100 max-w-[90%] rounded-lg shadow-lg p-[1rem] grid grid-cols-1 grid-rows-3 gap-y-[1.5rem] 3xl:grid-flow-col grid-rows-3 gap-x-[15rem]">

                        <div className="text-4xl font-bold max-3xl:text-center">
                            <p>{props.title}</p>
                        </div>

                        <div className="text-md max-3xl:text-center">
                            <p>{props.desc}</p>
                        </div>

                        <div className="flex max-3xl:justify-center">
                            {props.button}
                        </div>

                        <div className="3xl:row-span-3">
                            {props.element}
                        </div>

                </div>
            </div>
        </>

    )

}

export default Section