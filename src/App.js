import './App.css';
import './ui/pallete.css';


import {useEffect, useRef, useState} from 'react';

import Navbar from './navbar';
import { About } from './about';
import { Home } from './home';
// import { Contact } from './contact';
import { Features, Services } from './services';
import { Footer } from './footer';
import { PopUpApp } from './webEx/popup';
import { ASLPIP } from './more';
import { ErrorHandler } from './contexts';
import { on } from './ui/helpers';


const Views = ['Home', 'About Us', 'Services', `Contact Us`];


export const ProjectName = "VisibleVoice";


export const ASL = {
    stopped: false,
    signing: false,
    modal: undefined,

    end: function(){
        this.onend?.();
        this.stopped = true;
        this.signing = false;
    },

    onend: undefined,

    stop: function (){
        this.stopped = true;
        this.signing = false;
        dispatchEvent(new Event("cancelled-asl"));
    },

    sign: function (sentence){
        this.signing = true;
        this.stopped = false;
        dispatchEvent(new CustomEvent("sign-asl", {
            detail: sentence
        }));

    },

    register: function (vidElem){
        this.modal = vidElem;
    },

    error: function (err){
        this.end();
    }
}



export default function TechFestApp() {
    const [scroll, setScroll] = useState(false);
    const homeRef = useRef(null), aboutRef = useRef(null), featuresRef= useRef(null), servicesRef = useRef(null), contactRef = useRef(null);
    const [popUp, setPopUp] = useState(true);
    const [ttSignModal, setttSignModal] = useState(false);
    const [errors, setErrors] = useState([]);
    
    on("sign-asl", ({detail})=> {
        setttSignModal({detail});
    });

    return (
        <ErrorHandler.Provider value={{add: addError}}>
            <div className="main-app app mega-max" onScroll={handleScroll} style={{overflow: "hidden auto"}} >
                <Navbar scroll={scroll} goTo={goTo} />
                <Home openPopUp={ () => setPopUp(true) } ref={homeRef} />
                <div className='fw pad' style={{paddingTop: "5px"}}>
                    <About ref={aboutRef} />
                    <Features ref={featuresRef} />
                    <Services ref={servicesRef} />
                </div>
                
                { popUp && <PopUpApp close={() => setPopUp(false)} /> }
                { ttSignModal && <ASLPIP data={ttSignModal.detail} closeModal={() => setttSignModal(false)} /> }

                <Footer ref={contactRef} />
            </div>
        </ErrorHandler.Provider>
    );
    
    function handleScroll({target}){
        setScroll(target.scrollTop > 50);
    }

    function goTo(url){
        let ref;
        switch(url){
            case '/#home': {
                ref = homeRef
                break;
            }
            case '/#about': {
                ref = aboutRef
                break;
            }
            case '/#features': {
                ref = featuresRef
                break;
            }
            case '/#services': {
                ref = servicesRef
                break;
            }
            case '/#contact': {
                ref = contactRef
                break;
            }
            default: {
                console.error("!!!Unexpected Behaviour");
            }
        }
        ref && ref.current.scrollIntoView({ behavior: 'smooth', inline: 'start' })
    }

    function addError(err){
        setErrors([...errors, err]);

        setTimeout(()=> {
            let index = errors.indexOf(err);
            errors.splice(index, 1);
            setErrors(errors);
        }, 2000);
    }
}

console.log( document.querySelectorAll(".feat") );