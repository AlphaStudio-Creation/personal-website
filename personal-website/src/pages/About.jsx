
import TextPart from "../components/TextPart"

function About(){

    return(

        <>
            <div className="flex justify-center mt-[5rem]">
                <p className="text-5xl font-bold w-[90%] mt-[5rem] text-center">About me!</p>
            </div>

            <div className="mt-[3rem]">
                <TextPart title="Hello!" desc="I know this page is gonna be boring because it will just be bunch of text that talking about myself.So I will try to make this short.I am AnsonRE,a student from Hong Kong.I am a person who love to create bunch of interesting stuffs and currently studying calculus! I think this is short right? It is already a short about me page compare to other."></TextPart>
            </div>

            <div className="mt-[3rem]">
                <TextPart title="Message for you!" desc="Thanks you for walk around in the website!"></TextPart>
            </div>

        </>

    )

}

export default About