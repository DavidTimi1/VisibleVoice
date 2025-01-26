import ttsBg from './imgs/tts-bgimg.jpeg';
import voiceNavBg from './imgs/nav-bgimg.png';
import simplyBg from './imgs/simply-bgimg.jpeg';
import customFontsBg from './imgs/text-bgimg.jpeg';
import signBg from './imgs/sign-bgimg.jpeg';

import buildImg from './imgs/dev-icon-img.png';
import supportImg from './imgs/support-icon-img.png';

import { forwardRef, useEffect, useRef } from "react";
import { FeatureEnabled, BgImg, observer } from "./more";
import { on } from './ui/helpers';



const services = [
    {
        title: "Custom Solutions",
        descr: `Tailored accessibility solutions for schools and institutions 
            to ensure their digital content is accessible to all students.`,
        img: buildImg,
    },
    {
        title: "Ongoing Support",
        descr: `Continuous support and updates to ensure our extension evolves 
            with the changing needs of students and technology.`,
        img: supportImg,
    }
]

const features = [
    {
        title: <> Built-in <br></br> Screen Reader Technology </>,
        descr: `We provide built-in natural Text-To-Speech conversion,
                to offer seamless web navigation for the visually impaired.
                Ensuring that every website is easy to explore.`,
        img: ttsBg,
        alt: "image showing text-to-speech feature",
        ratio: "1/1"
    },
    {
        title: <> Customizable Fonts <br></br> for Enhanced Readability </>,
        descr: `Our solution offers the ability to customize fonts and their sizes.
                With flexible scaling options, users can adjust text sizes across websites,
                ensuring optimal optical comfort and enhancing readability and accessibility.`,
        img: customFontsBg,
        alt: "image showing font customization",
        ratio: "216/233"
    },
    {
        title: "Voice Command Navigation",
        descr: `We offer easy web navigation using voice commands enabling hands-free browsing.
                This voice-activated controls enhances inclusitivity for individuals with mobility challenges,
                providing a seamless and empowering web browsing experience.`,
        img: voiceNavBg,
        alt: "image depicting voice command navigation",
        ratio: "1/1"
    },
    {
        title: "Content Simpification",
        descr: `Our solution also offers content simplication feature
                that converts complex text into easy-to-understand language.
                This is ideal for users with cognitive disabilities or struggle with large words.
                This ensures all users regardless of their reading level can access online content with ease.`,
        img: simplyBg,
        alt: "image depicting content simplification",
        ratio: "311/162"
    },
    {
        title: <>Text-to-Sign Language <br></br> Translation </>,
        descr: `Our solution also offers a built-in text-to-sign language feature
                that converts written content into sign-language videos,
                making web-pages more accessibke for the deaf and hard of hearing community.`,
        img: signBg,
        alt: "image showing sign language",
        ratio: "1/1"
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
        <div className="fw trans box" ref={ref}>
            <div className='up'>
                <h2 className='left fs-3 fw-500'>
                    Services We Render 
                </h2>
                <div className='flex even-space gap-3' style={{flexWrap: "wrap"}} >
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
        <div className="fw box" ref={ref}>
            <div className='fw pad'>
                <h3 className='fs-3 fw-500 center-text'> Features </h3>
                <div className="flex-col gap-5">
                    
                    {
                        features.map( (feature, index) => <Feature key={index} data={feature} reverse={(index % 2)} /> )
                    }
                </div>
            </div>
        </div>
    )

})


function Feature({data, reverse}){
    const {title, descr, img, alt, ratio} = data;
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
        <div>
        
            <FeatureEnabled>
                <div className="feat fw trans" ref={myRef}>
                    <div className={ "fw flex-col gap-2 sdq mid-align" + (reverse ? " flex-rev" : '') }>
                        <div className="fw hero-img left" style={{aspectRatio: ratio}}>
                            <img src={img} alt={alt} className='fw' style={{borderRadius: "1rem 1rem 0 0", objectFit: "cover"}} />
                        </div>
                        <div className="ter right flex-col gap-2" style={{padding: "10px"}}>
                            <h3 className="fw-600"> {title} </h3>
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
        <div className="feat br-1 up serv">
            <FeatureEnabled>
                <div style={{padding: "20px"}}>
                    <h4 className="flex mid-align gap-2 fw-500">
                        <div style={{backgroundColor: "black", borderRadius: "50%"}}>
                            <div style={{margin: "10px"}}>
                                <BgImg src={img} inline={true} />
                            </div>
                        </div>
                        <span> {title} </span>
                    </h4>
                    <p className="fw-100"> {descr} </p>
                </div>
            </FeatureEnabled>
        </div>
    )
}