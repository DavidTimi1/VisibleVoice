import './footer.css';

import { useEffect, useState, useRef, forwardRef } from "react";

import { Button } from "./ui/buttons";
import { apiHost, ProjectName } from './App';
import { Input, observer } from './more';
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
                    <div className="fs-5 fw-500">
                        To help improve our services, <br></br>
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
        <form method="post" action={`${apiHost}/feedback/visualvoice`} className="feedform fw br-1 up" ref={formRef} onSubmit={handleSubmit}>
            <div className='fw flex-col gap-2'>

                <div className={`alert ${state !== undefined ? sent ? "alert-success" : "alert-danger" : 'disappear'}`}>
                    {
                        state && state?.data
                    }
                </div>

                <div className="flex md-flex-col fw gap-2">
                    <Input label="Name*" id="inputName" />
                    <Input label="Email*" type="email" id="inputEmail" />
                </div>

                <Input label="Subject*" id="inputSubject" />

                <Input label="Message*" rows={3} id="inputMessage" />

                <label className="fw flex mid-align gap-2">
                    <input type="checkbox" name="subscribe" style={{ padding: "10px" }} />
                    <div>
                        Subscribe to receiving updates on our progress
                    </div>
                </label>
                <div className="mx-auto flex" style={{ justifyContent: 'right' }}>
                    <Button>
                        Send Feedback
                    </Button>
                </div>

            </div>
        </form>
    )

    function handleSubmit(e) {
        const { target } = e;
        e.preventDefault();

        const fd = new FormData(target);

        fetch(`${apiHost}/feedback/visualvoice`, {
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
                console.log(err, err.message);
                setState({
                    status: false,
                    data: err.details ?? err.message
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