
import ttsImg from '../imgs/tts-img.png';
import slImg from '../imgs/images.png';

import { useEffect, useRef, useState } from "react";
import { Button, IconBut } from "../ui/buttons";

import { ASL } from "../app";
import { BgImg } from "../more";

// export const browserAPI = chrome || browser;
export const supportTTS = window.speechSynthesis;
export const speechSyn = supportTTS;


export const disabilities = {
    visual: {
        on: false,
        deps: ["tts"]
    },
    audio: {
        on: false,
        deps: ["subs"]
    },
    cognitive: {
        on: false,
        deps: ["simply"]
    },
}


let ttsOn;

if (!supportTTS){
    ttsOn.disabled = true;
    ttsOn.dataset.hoverText = "Oops! Its seems your browser does not have support for this feature";
}

  
let readElements = new Set(); // To track already read elements



function isElementVisible(el) {
    const {visibility, display} = getComputedStyle(el);
    return el.offsetParent !== null && visibility !== 'hidden' && display !== 'none';
}

function highlightElement(el) {
    el.classList.add("selected");
}
  

function removeHighlight(el) {
    el.classList.remove("selected");
}


function removeAllHighlights() {
    document.querySelectorAll(".selected")
    .forEach(removeHighlight);
}
  

function isChildOfReadElement(el) {
    // Check if any parent of this element is already in the readElements set
    let parent = el.parentElement;
    while (parent) {
    if (readElements.has(parent)) {
        return true;
    }
    parent = parent.parentElement;
    }
    return false;
}


export const readElement = elem => {
    // Skip elements already read or child elements of an already read parent
    highlightElement(elem);

    let content = getText(elem);
    const utterance = new SpeechSynthesisUtterance(content);
    
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    let doneReading = new Promise(res => {
        utterance.onend = () => {
            removeHighlight(elem);
            res()
        };
    })

    speechSyn.speak(utterance);

    return doneReading;
}


export const signElement = elem => {
    // Skip elements already read or child elements of an already read parent
    highlightElement(elem);

    let content = getText(elem);

    let doneSigning = new Promise(res => {
        ASL.onend = () => {
            removeHighlight(elem);
            res()
        };
    })

    ASL.sign(content);

    return doneSigning;
}


// export function stopReading() {
//     console.log(supportTTS);
//     // const supportTTS = window.speechSynthesis, speechSyn = supportTTS;
//     if (speechSyn.speaking) {
//         speechSyn.cancel();
//     }
// }

// chrome://settings/?search=live+caption



export function PopUpApp({close}){
    const [state, setState] = useState({active: 0});
    const myRef = useRef(null);
    const active = state?.active;

    return (
        <div className="overlay" style={{background: "linear-gradient( to bottom, #00000080, #80808050, #00000080"}}>
            <div className="main-pop margin" ref={myRef} style={{borderRadius: "1em"}}>
                <div className="max" style={{padding: "20px"}}>
                    <First active={active === 0} next={next} />
                    <Second active={active === 1} next={next} />
                    <Third active={active === 2} next={next} />
                </div>
                <div className="abs" style={{bottom: "calc(100% + 10px)", right: 0}}>
                    <IconBut className="fa-solid fa-xmark fa-lg" onClick={close}>
                        <span className="sr-only">Close</span>
                    </IconBut>
                </div>
            </div>
        </div>
    )

    function next(forward){
        let future = forward === false? --state.active : ++state.active;

        if (active < 2 || forward === false){
            const newState = {...state, active: future}
            setState(newState);
        } else close()
    }
}


function First({active, next}){
    const myRef = useRef(null);

    useEffect(() => {
        let t_id = active && setTimeout(() => myRef.current.classList.add("show"));

        return ()=> {
            t_id && clearTimeout(t_id);
        }
    }, [active]);

    return (
        active &&
        <div ref={myRef} className="pop">
            <h3 style={{textAlign: "center"}}> Welcome, let's get you started </h3>
            <div>
                Make the web much more accessible through this extension
            </div>
            <div className="flex" style={{justifyContent: "right", margin: "20px 0"}}>
                <Button onClick={next}>
                    <span className="flex mid-align" style={{gap: "10px"}}>
                    Next
                    <i className="fa-solid fa-angle-right" />
                    </span>
                </Button>
            </div>
        </div>
    )
}


function Second({active, next}){
    const myRef = useRef(null);

    useEffect(() => {
        let t_id = active && setTimeout(() => myRef.current.classList.add("show"));

        return ()=> {
            t_id && clearTimeout(t_id);
        }
    }, [active]);

    return (
        active &&
        <div className="pop" ref={myRef}>
            <h4 style={{textAlign: "center"}}> How can we assist you? </h4>
            <div className="flex-col" style={{alignItems: "center"}}>
                <Check data="visual">
                    Visual Impairment
                </Check>
                <Check data="audio">
                    Hearing Impairment
                </Check>
                <Check data="cognitive">
                    Cognitive Challenges
                </Check>
            </div>
            <div className="flex" style={{justifyContent: "right", margin: "20px 0"}}>
                <Button onClick={handleClick}>
                    <span className="flex mid-align" style={{gap: "10px"}}>
                    Next
                    <i className="fa-solid fa-angle-right" />
                    </span>
                </Button>
            </div>
        </div>
    )


    function Check({children, data}){
        const myRef = useRef(null);

        useEffect(()=> {
            myRef.current.checked = disabilities[data].on;
        })

        return (
            <label className="flex mid-align" style={{gap: "15px"}}>
                <input type="checkbox" onChange={handleClick} ref={myRef} />
                <span> {children} </span>
            </label>
        )

        function handleClick(e){
            const {target} = e;
            
            disabilities[data].on = target.checked;
        }
    }

    function handleClick(){
        for (let p in disabilities){
            if (disabilities[p].on){
                next();
                return;
            }
        }
    }
}


function Third({active, next}){
    const myRef = useRef(null);

    useEffect(() => {
        let t_id = active && setTimeout(() => myRef.current.classList.add("show"));

        return ()=> {
            t_id && clearTimeout(t_id);
        }
    }, [active]);

    return (
        active &&
        <div className="pop" ref={myRef}>
            <h4 style={{textAlign: "center"}}> Feature Customizations </h4>
            <div className="flex-col" style={{alignItems: "center"}}>
                {
                    disabilities.visual.on &&
                    <SetOn bg={ttsImg}>
                        Text-to-Speech
                    </SetOn>
                }
                {
                    disabilities.audio.on &&
                    <SetOn>
                        Video  Subtitles and Transcriptions
                    </SetOn>
                }
                {
                    disabilities.audio.on &&
                    <SetOn bg={slImg}>
                        Text-to-Sign Language
                    </SetOn>
                }
                {
                    disabilities.cognitive.on &&
                    <SetOn>
                        Content Simplification
                    </SetOn>
                }
            </div>
            <div className="flex" style={{justifyContent: "space-between", margin: "20px 0"}}>
                <Button className="flex mid-align" style={{alignItems: "center"}} onClick={() => next(false)}>
                    <i className="fa-solid fa-angle-left" />
                    Back
                </Button>
                <Button onClick={next}>
                    <span className="flex mid-align" style={{gap: "10px"}}>
                    Next
                    <i className="fa-solid fa-angle-right" />
                    </span>
                </Button>
            </div>
        </div>
    )


    function SetOn({children, disabled, toggleState, on, bg}){
        const myRef = useRef(null);

        useEffect(() => {
            myRef.current.classList.add("anime");
        }, [on]);


        return (
            <label className="flex" data-disabled={disabled} ref={myRef} style={{alignItems: "center"}} onClick={toggleState}>
                <BgImg src={bg} inline style={{margin: "10px", borderRadius: "5px"}} />
                <span> {children} </span>
                {
                    !on || disabled?
                    <i className="fa-solid fa-circle-xmark" />
                    :
                    <i className="fa-solid fa-circle-check" />
                }
                <button className="abs" style={{display: "none"}}></button>
            </label>
        )
    }
}


function visibleChildren(elem){
    let el = elem.cloneNode(true);

    // Function to select all elements with computed style of display: none
    const allElements = el.querySelectorAll('*'), allOriginal = elem.querySelectorAll('*');
  
    allElements.forEach((child, index) => {
        const {display, visibility} = window.getComputedStyle(child);
        if (display === 'none' || visibility === 'hidden') {
            child.remove();
        }
        child.original = allOriginal[index];
    });

    return el
}


export function getText(elem){
    let el = visibleChildren(elem);

    return el.innerText;
}





















// document.getElementById('startReading').addEventListener('click', () => {
//     browserAPI.tabs.query({active: true, currentWindow: true}, (tabs) => {
//         browserAPI.scripting.executeScript({
//             target: {tabId: tabs[0].id},
//             function: startReading
//         });
//     });
// });


// document.getElementById('stopReading').addEventListener('click', () => {
//     browserAPI.tabs.query({active: true, currentWindow: true}, (tabs) => {
//         browserAPI.scripting.executeScript({
//             target: {tabId: tabs[0].id},
//             function: stopReading
//         });
//     });
// });

// document.getElementById('startListening').addEventListener('click', () => {
//     startVoiceRecognition();
//   });
  
//   function startVoiceRecognition() {
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
  
//     document.getElementById('status').innerText = "Listening for voice commands...";
  
//     recognition.start();
  
//     recognition.onresult = (event) => {
//       const command = event.results[0][0].transcript.toLowerCase();
//       document.getElementById('status').innerText = `You said: "${command}"`;
  
//       if (command.includes('read this page')) {
//         startReading();
//       } else if (command.includes('stop reading')) {
//         stopReading();
//       } else {
//         document.getElementById('status').innerText = `Command not recognized: "${command}"`;
//       }
//     };
  
//     recognition.onspeechend = () => {
//       recognition.stop();
//     };
  
//     recognition.onerror = (event) => {
//       document.getElementById('status').innerText = `Error occurred in recognition: ${event.error}`;
//     };
//   }