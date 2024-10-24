import './home.css';
import img1 from './imgs/img1.jpg';

import { forwardRef } from "react";
import { FeatureEnabled } from './more';


export const Home = forwardRef((props, ref) => {
    const {openPopUp} = props

    return (
        <div className="mega-max" ref={ref}>
            <div className="hero-img abs max" style={{backgroundImage: `url(${img1})`}} >
            </div>
            <div className='flex max mid-align' style={{justifyContent: "center"}}>
                <div className='max'>
                    <div className="abs-mid" style={{textWrap: "pretty"}}>
                        <FeatureEnabled>
                            <h2 className="m-txt">
                                Empowering Education for Everyone
                            </h2>
                            <p className="sub-txt">
                                Accessive web, inclusive learning.
                            </p>
                            <div style={{padding: "30px"}}>
                                <button className="margin" onClick={openPopUp}> 
                                    Get the Extension 
                                    <span className="sr-only">Download the accesibility extension</span>
                                </button>
                            </div>
                        </FeatureEnabled>
                    </div>
                </div>
            </div>

        </div>
        
    )
})