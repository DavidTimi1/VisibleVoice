import { forwardRef, useEffect } from "react";
import { FeatureEnabled, observer } from "./more";
import { on } from "../helpers";



export const About = forwardRef((props, ref) => {


    useEffect(() => {
        const el = ref.current;
        observer.observe(el);
        
        on('scrolledIntoView', el, ()=> {
            el.classList.add("untrans");
        })

        return ()=> observer.unobserve(el);
    }, [ref])

    return (
        <div className="fw trans" ref={ref}>
            <FeatureEnabled>
                <div id="about" className="flex-col pad" style={{padding: "75px 20px", justifyContent: "space-evenly"}}>
                    <h3 className="fw lap-right up">
                        About <br></br> Us 
                    </h3>
                    
                    <div className="mission fw lap-left up" >
                        We believe in an inclusive web <br></br> 
                        where educational content is accessible to everyone, <br></br>
                        regardless of disability. <br></br>
                        
                        <p>
                            Our browser extension is designed to break down barriers, <br></br>
                            making learning easier and more effective for students with disabilities.
                        </p>
                    </div>
                </div>
            </FeatureEnabled>
        </div>
    )
})