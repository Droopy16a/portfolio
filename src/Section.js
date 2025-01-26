import './style/Section.css';
import Card from './Card.js';
import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOMServer from 'react-dom/server';
import {isMobile} from 'react-device-detect';

let H = 0

let tel = isMobile ? 100 : 50 


const turn = (e, cards) => {

  const F = document.getElementsByClassName("containerTitre")
  let index = Array.from(F).indexOf(e.target)

  console.log(index);
  
  const htmlString = ReactDOMServer.renderToStaticMarkup(cards[0]);
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const className = doc.querySelector('div').getAttribute('class');
  const card = document.getElementsByClassName(className)[0];
  let vw = window.innerWidth / 100;
  let rect = card.getBoundingClientRect();
  let L = (rect.width * cards.length) + ((cards.length - 1) * 10) + (((50 * vw) * 10/100) * 2) + ((5 * vw) * 2)
  // let L = (rect.width * cards.length) + (((50 * vw) * 10/100) * 2) + ((5 * vw) * 2)
  let nb = 0
  while (L > window.innerWidth) {
      L = L - rect.width
      nb += 1
  }
  if (Math.round(cards.length / (cards.length - nb)) >= cards.length / (cards.length - nb)){
    H = rect.height * Math.round(cards.length / (cards.length - nb)) + (50 * ((Math.round(cards.length / (cards.length - nb))) - 1))
  }else{
    H = rect.height * (Math.round(cards.length / (cards.length - nb)) + 1) + (50 * ((Math.round(cards.length / (cards.length - nb)) + 1) - 1))
  }

  const projet = document.getElementsByClassName('projet')[index];
  const fleche = document.getElementsByClassName('fleche')[index];

  console.log(projet.style.height);
  
  if (projet.style.height!=="0px") {
    fleche.style.transform = "rotateZ(-90deg)";
    projet.style.height = "0";
    projet.style.padding = "0px";
    // projet.style.border = "var(--bleu) 1px solid"
  } else {
    console.log(H)
    fleche.style.transform = "rotateZ(0deg)";            
    projet.style.height = H + "px";
    projet.style.padding = "10%";
    // projet.style.border = "rgb(119 119 119) 1px solid"
  }
};

function Section({cards, titre, id}) {
    const [gridTemplateColumns, setGridTemplateColumns] = useState('auto '.repeat(2));
    useEffect(() => {
      
        const handleResize = () => {
            const htmlString = ReactDOMServer.renderToStaticMarkup(cards[0]);
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            const className = doc.querySelector('div').getAttribute('class');
            const card = document.getElementsByClassName(className)[0];
            const projetMoi = document.getElementsByClassName('projet')[id];
            let vw = window.innerWidth / 100;
            let rect = card.getBoundingClientRect();
            let L = (rect.width * cards.length) + ((cards.length - 1) * 10) + (((50 * vw) * 10/100) * 2) + ((5 * vw) * 2)
            // let L = (rect.width * cards.length) + (((50 * vw) * 10/100) * 2) + ((5 * vw) * 2)
            console.log("Window : " + window.innerWidth)
            let nb = 0
            while (L > window.innerWidth) {
                L = L - rect.width
                nb += 1
            }
            if (Math.round(cards.length / (cards.length - nb)) >= cards.length / (cards.length - nb)){
              H = rect.height * Math.round(cards.length / (cards.length - nb)) + (50 * ((Math.round(cards.length / (cards.length - nb))) -1))
            }else{
              H = rect.height * (Math.round(cards.length / (cards.length - nb)) + 1) + (50 * ((Math.round(cards.length / (cards.length - nb)) + 1) -1))
            }
            if (projetMoi.style.height!=="0px") {
            projetMoi.style.height = H + "px";}
            console.log(cards.length / (cards.length - nb))
            const newTemplate = 'auto '.repeat(cards.length - nb)

            setGridTemplateColumns(newTemplate);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [cards.length]);

    return (
    <div className='container'>
        <h2 onClick={(e) => {turn(e, cards)}} className='containerTitre'> <FontAwesomeIcon className='fleche' icon={faChevronDown}/>{titre}</h2>
        <div className='projet' style={{ gridTemplateColumns, height:"0px", padding: "0px" }}>
        {cards.map((d, index) => (
          d
        ))}
        </div>
      </div>
    );
};

export default Section;