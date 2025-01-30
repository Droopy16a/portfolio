
import { useEffect, useState } from 'react';
import './style/Moi.css'

let ismobile = window.innerWidth <= 728

function Moi({texte}) {
    useEffect(() => {
        const handleResize = () => {
            ismobile = window.innerWidth <= 728;
            let vw = window.innerWidth / 100;
            const pres = document.getElementsByClassName("pres");
            if (ismobile) {
                Array.from(pres).map((v) => {
                    v.style.width =  `calc(80vw)`
                })
                // ((100 * vw) - (((50 * vw) * 5/100) * 2) - ((5 * vw) * 2)) + "px";
            } else {
                Array.from(pres).map((v) => {
                    v.style.width =  `60vw`
                })
            };   
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    return (
        <div className='pres'> 
            <p dangerouslySetInnerHTML={{ __html: texte }} />
        </div>
    )
}

export default Moi