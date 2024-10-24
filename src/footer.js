import './footer.css';

import { useEffect, useState, useRef, forwardRef } from "react";

import { Button } from "./ui/buttons";
import { ProjectName } from './app';
import { observer } from './more';
import { on } from './ui/helpers';



export const Footer = forwardRef((props, ref) => {

    useEffect(() => {
        const el = ref.current;
        observer.observe(el);

        on('scrolledIntoView', el, () => {
            el.classList.add("untrans");
        })

        return () => observer.unobserve(el)
    }, [ref]);

    return (
        <div className="fw foot pad trans" ref={ref}>
            <div className="flex fw mid-align" style={{ padding: "75px 10px 10px 10px", justifyContent: "space-between" }}>
                <div className="flex-col mid-align">
                    <div className="flex fw mid-align">
                        {/* project logo */}
                        <div style={{ aspectRatio: "1/1", height: "50px" }}>

                        </div>
                        <div className="hero-title fh"> {ProjectName} </div>
                    </div>
                    <Socials />
                </div>

                <div className='flex-col'>
                    <div className="sub-txt">
                        To help imporve our services <br></br>
                        We would love your feedback
                    </div>

                    <FeedbackForm />
                </div>
            </div>
            <DevCredits />
        </div>
    )
})


function FeedbackForm() {
    const [state, setState] = useState();
    const formRef = useRef(null);
    const sent = state?.status;

    return (
        <form method="post" action="/feedback" className="feedform br-1 up" ref={formRef} onSubmit={handleSubmit}>
            {
                state !== undefined &&
                <div className={`${sent ? '' : "err"}`}>
                    <div style={{ padding: "20px" }}>
                        {state?.data}
                    </div>
                </div>
            }

            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputName">Name</label>
                    <input name="name" type="text" placeholder="Enter your name" id="inputName"></input>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail">Email</label>
                    <input name="email" type="email" placeholder="Enter your email" id="inputEmail"></input>
                </div>
            </div>
            <div className="form-group fw">
                <label htmlFor="inputSubject">Subject</label>
                <input type="text" name="subject" className="form-control" id="inputSubject" placeholder="Subject" />
            </div>
            <div className="form-group fw">
                <label htmlFor="inputFeedback">Message</label>
                <textarea name="feedback" placeholder="Type your message ..." className="form-control" id="inputFeedback"></textarea>
            </div>
            <label className="fw flex mid-align">
                <input type="checkbox" name="subscribe" style={{ padding: "10px" }} />
                <div style={{ padding: "10px" }}>
                    Subscribe to receiving updates on our progress
                </div>
            </label>
            <div className="margin flex" style={{ justifyContent: 'right' }}>
                <Button>
                    Send Feedback
                </Button>
            </div>
        </form>
    )

    function handleSubmit(e) {
        const { target } = e;
        e.preventDefault();

        const fd = new FormData(target);

        fetch("/feedback", {
            method: "post",
            body: fd
        }).then(res => res.json)
            .then(json => {
                clearInputs();
                setState({
                    status: true,
                    data: json
                })
            })
            .catch(err => {
                setState({
                    status: false,
                    data: err.details ?? err.reason
                })
            })
    }


    function clearInputs() {
        const all = ["message", "subject"];

        all.forEach(elem => {
            formRef.current[elem].value = '';
        })
    }
}


function Socials() {

    return (
        <div></div>
    )
}

function DevCredits() {

    return (
        <div className='mini-txt margin cred' style={{ padding: "10px" }}>
            <span>
                Developed by <a href={githubLink} rel="noreferrer" target='_blank'> TimiDev </a> |
            </span>
            <span>
                | {ProjectName} &copy; {new Date().getFullYear()}
            </span>
        </div>
    )
}

const githubLink = "https://github.com/DavidTimi1";