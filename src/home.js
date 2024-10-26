import './home.css';
import img1 from './imgs/img1.jpg';

import { forwardRef } from "react";
import { FeatureEnabled } from './more';


export const Home = forwardRef((props, ref) => {
    const { openPopUp } = props

    return (
        <div className="mega-max" ref={ref}>
            <div className="hero-img abs max" style={{ backgroundImage: `url(${img1})` }} >
            </div>
            <div className='flex max mid-align' style={{ justifyContent: "center" }}>
                <div className='max'>
                    <div className="abs-mid fw pad" style={{ textWrap: "pretty" }}>
                        <FeatureEnabled>
                            <div className="flex-col gap-3 center-text" style={{color: "white"}}>
                                <div className="fs-1 fw-800">
                                    Empowering Education for Everyone
                                </div>
                                <div className="fw-200">
                                    Accessive web, inclusive learning
                                </div>
                                <div>
                                    <button className="mx-auto" onClick={openPopUp}>
                                        Get the Extension
                                        <span className="sr-only"> Download the accesibility extension </span>
                                    </button>
                                </div>
                            </div>
                        </FeatureEnabled>
                    </div>
                </div>
            </div>
        </div>

    )
})