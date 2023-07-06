import React from "react";

function AlternateHeadline({title,info}){
    return(
        <div className="container-alternate">
            <div className="main-alternate">
                <h2>{title}</h2>
                <p>{info}</p>
            </div>
        </div>
    )
}

export default AlternateHeadline;