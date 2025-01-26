import { useEffect } from 'react';
import "./style/Competence.css"

function Competence({ pr, comp }) {
    useEffect (() => {
        const P = document.getElementsByClassName("progress");
        Array.from(P).map((p,i)=>{
            const text = document.getElementsByClassName("skill-percentage")[i];
            let W = p.getAttribute("data-width");
            p.style.width = W + "%";
            text.style.width = W + "%";
        })
    })

    return (
        <div className="skill-bar">
            <div className="skill-name">
                <span>{comp}</span>
                <span className="skill-percentage">{pr}%</span>
            </div>
            <div className="progress-bar">
                <div className="progress" data-width={pr}></div>
            </div>
        </div>
    );
};

export default Competence