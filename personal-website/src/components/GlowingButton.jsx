
function GlowingButton(props){

    return(

        <>
        
            <div className="flex justify-center items-center w-[10rem] ml-[-0.4rem]">

                <div className="relative inline-flex group h-[3rem]">
                    <div
                        className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                    </div>
                    <a href={props.link} title="Get quote now"
                        className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        role="button">{props.ButtonText}
                    </a>
                </div>
            </div>

        </>

    )

}


export default GlowingButton