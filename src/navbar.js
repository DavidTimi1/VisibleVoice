import './navbar.css';
import { IconBut } from './ui/buttons';
import { useEffect, useState, useRef } from 'react';

import { transitionEnd, once } from './ui/helpers.js';
import { ProjectName } from './app.js';


export default function Navbar({ scroll, goTo }) {
    const [showMenu, setShow] = useState(false);


    return (
        <div className={"navbar fw" + (scroll ? " scroll" : "")}>
            <div className='fw pad'>
                <div className="lap-nav nav fw flex mid-align">
                    <div className="hero-title fh"> {ProjectName} </div>
                    <div className="menu flex mid-align">
                        <NavLink nav={goTo} url='/#home'> Home </NavLink>
                        <NavLink nav={goTo} url='/#about'> About </NavLink>
                        <NavLink nav={goTo} url='/#features'> Features </NavLink>
                        <NavLink nav={goTo} url='/#services'> Services </NavLink>
                        <NavLink nav={goTo} url='/#contact'> Contact Us </NavLink>
                    </div>
                </div>

                <div className="mobile-nav nav fw flex mid-align">
                    <div className="hero-title fh"> {ProjectName} </div>
                    <div className="nav-icon">
                        {showMenu ?
                            <IconBut className="fa-solid fa-xmark" hover="Close" onClick={() => toggleMenu(false)} sr="close menu" />
                            :
                            <IconBut className="fa-solid fa-bars" hover="Menu" onClick={() => toggleMenu(true)} sr="open menu" />
                        }
                    </div>
                </div>

                <Menu show={showMenu} goTo={goTo} closeMenu={() => toggleMenu(false)} />
            </div>
        </div>
    )

    function toggleMenu(bool) {
        setShow(bool);
    }

}


function NavLink({ nav, url, children }) {

    return (
        <a className="nav-item" onClick={handleClick} href={url}>
            {children}
        </a>
    )

    function handleClick(e) {
        e.preventDefault();

        nav(url)
    }
}


function Menu({ show, goTo, closeMenu }) {
    const myRef = useRef(null);

    useEffect(() => {
        let t_id = show && setTimeout(() => myRef.current.classList.remove("close"));

        return () => {
            t_id && clearTimeout(t_id);
        }
    }, [show])

    return (
        show &&
        <div className="menu mob abs close" onClick={close} ref={myRef}>
            <div className='wrapper max'>
                <div className="content fw flex-col">
                    <NavLink nav={goTo} url='/#home'> Home </NavLink>
                    <NavLink nav={goTo} url='/#about'> About </NavLink>
                    <NavLink nav={goTo} url='/#features'> Features </NavLink>
                    <NavLink nav={goTo} url='/#services'> Services </NavLink>
                    <NavLink nav={goTo} url='/#contact'> Contact Us </NavLink>
                </div>
            </div>
        </div>
    )

    function close() {
        once(transitionEnd, myRef.current, closeMenu);
        myRef.current.classList.add("close");
    }
}