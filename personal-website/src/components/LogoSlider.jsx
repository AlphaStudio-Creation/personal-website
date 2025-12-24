
import React,{useState,useEffect} from 'react'
import Slider from "react-slick";

function LogoSlider(props){

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: props.slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        centerMode: true,
    };

    return(

        <>
            <div className="flex justify-center">
                <div className="slider-container w-[90%] shadow-lg">
                    <Slider {...settings}>

                        {props.logos.map((logo,index) => {
                            return(

                                <div>

                                    <img src={logo} alt={logo}></img>

                                </div>

                            )

                        })}

                    </Slider>
                </div>
            </div>
        </>

    )

}

export default LogoSlider