import ttsBg from './imgs/tts-bgimg.jpeg';
import voiceNavBg from './imgs/nav-bgimg.png';
import simplyBg from './imgs/simply-bgimg.jpeg';
import customFontsBg from './imgs/text-bgimg.jpeg';
import signBg from './imgs/sign-bgimg.jpeg';

import buildImg from './imgs/dev-icon-img.png';
import supportImg from './imgs/support-icon-img.png';

import { forwardRef, useEffect, useRef } from "react";
import { FeatureEnabled, BgImg, observer } from "./more";
import { on } from '../helpers';



const services = [
    {
        title: "Custom Solutions",
        descr: "Tailored accessibility solutions for schools and institutions to ensure their digital content is accessible to all students.",
        img: buildImg,
    },
    {
        title: "Ongoing Support",
        descr: "Continuous support and updates to ensure our extension evolves with the changing needs of students and technology.",
        img: supportImg,
    }
]

const features = [
    {
        title: <> Built-in <br></br> Screen Reader Technology </>,
        descr: <> We provide built-in natural Text-To-Speech conversion, <br></br> 
                to offer seamless web navigation for the visually impaired. <br></br>
                Ensuring that every website is easy to explore. </>,
        img: ttsBg,
        alt: "image showing text-to-speech feature"
    },
    {
        title: <> Customizable Fonts <br></br> for Enhanced Readability </>,
        descr: <> Our solution offers the ability to customize fonts and their sizes. <br></br>
                With flexible scaling options, users can adjust text sizes across websites, <br></br>
                ensuring optimal optical comfort and enhancing readability and accessibility. </>,
        img: customFontsBg,
        alt: "image showing font customization"
    },
    {
        title: "Voice Command Navigation",
        descr: <> We offer easy web navigation using voice commands enabling hands-free browsing. <br></br>
                This voice-activated controls enhances inclusitivity for individuals with mobility challenges, <br></br>
                providing a seamless and empowering web browsing experience.</>,
        img: voiceNavBg,
        alt: "image depicting voice command navigation"
    },
    {
        title: "Content Simpification",
        descr: <> Our solution also offers content simplication feature <br></br>
                that converts complex text into easy-to-understand language. <br></br>
                This is ideal for users with cognitive disabilities or struggle with large words. <br></br>
                This ensures all users regardless of their reading level can access online content with ease. </>,
        img: simplyBg,
        alt: "image depicting content simplification"
    },
    {
        title: <>Text-to-Sign Language <br></br> Translation </>,
        descr: <> Our solution also offers a built-in text-to-sign language feature <br></br>
                that converts written content into sign-language videos, <br></br>
                making web-pages more accessibke for the deaf and hard of hearing community. </>,
        img: signBg,
        alt: "image showing sign language"
    }
]

    

export const Services = forwardRef((props, ref) => {
    
    useEffect(() => {
        const el = ref.current;
        observer.observe(el);
        
        on('scrolledIntoView', el, ()=> {
            el.classList.add("untrans");
        })

        return()=> observer.unobserve(el)
    }, [ref])


    return (
        <div className="fw trans" ref={ref}>
            <div className='up' style={{padding: "75px 20px"}}>
                <h3 className='left'>
                    Services We <br></br>
                    Render 
                </h3>
                <div className='flex even-space' style={{flexWrap: "wrap"}} >
                    {
                        services.map( (service, index) => <Service key={index} data={service} /> )
                    }
                </div>
            </div>

        </div>
    )
})



export const Features = forwardRef((props, ref) => {

    return (
        <div className="fw" ref={ref}>
            <div style={{padding: "75px 20px"}}>
                <h3> Features </h3>
                {
                    features.map( (feature, index) => <Feature key={index} data={feature} reverse={(index % 2)} /> )
                }
            </div>
        </div>
    )

})


function Feature({data, reverse}){
    const {title, descr, img, alt} = data;
    const myRef = useRef(null);
    
    useEffect(() => {
        const el = myRef.current;
        observer.observe(el);
        
        on('scrolledIntoView', el, ()=> {
            el.classList.add("untrans");
        })

        return()=> observer.unobserve(el)
    }, []);


    return (
        <div style={{margin: "20px 0"}}>
        
            <FeatureEnabled>
                <div className="feat fw trans" ref={myRef}>
                    <div className={ "fw flex-col sdq mid-align" + (reverse ? " flex-rev" : '') } style={{padding: "30px 0", gap: "20px"}}>
                        <div className="fw hero-img left">
                            <img src={img} alt={alt} className='br-1 fw' style={{objectFit: "cover"}} />
                        </div>
                        <div className="ter right">
                            <h3> {title} </h3>
                            <p> {descr} </p>
                        </div>
                    </div>
                </div>
            </FeatureEnabled>

        </div>
    )
}


function Service({data}){
    const {title, descr, img} = data;

    return (
        <div className="feat fw br-1 up" style={{backgroundColor: "var(--sec-col)", width: "clamp(270px, 45%, 400px)", margin: "10px"}} >
            <FeatureEnabled>
                <div style={{padding: "20px"}}>
                    <h3 className="flex mid-align" style={{gap: "20px"}}>
                        <BgImg src={img} inline style={{borderRadius: "5px"}} />
                        <span> {title} </span>
                    </h3>
                    <p> {descr} </p>
                </div>
            </FeatureEnabled>
        </div>
    )
}