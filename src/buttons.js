export function Button(props){
    const {href, onClick, hover, className, children} = props;

    return (
        <button onClick={onClick} className={(className ?? '') + (hover? " hover" : "")} data-hover={hover? hover : ""}>
            <div className="abs btn-bg"></div>
            {children}
        </button>
    )
}


export function IconBut(props){
    const {href, onClick, hover, className, children} = props;
    
    if (href){
        return (
            <a href={href} target="_blank" rel="noreferrer" onClick={onClick} className={"no-link" + (hover? " hover" : "")} data-hover={hover? hover : ""}>
                <div className="abs btn-bg"></div>
                <i className={className}></i>
                {children}
            </a>
        )
    }
 
    return (
        <button type="button" onClick={onClick} className={"no-btn" + (hover? " hover" : "")} data-hover={hover? hover : ""}>
            <div className="abs btn-bg"></div>
            <i className={className}></i>
            {children}
        </button>
    )
}