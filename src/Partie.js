import './style/Section.css';
// import Card from './Card.js';
import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOMServer from 'react-dom/server';

let H = 0
let ismobile = window.innerWidth <= 728

const turn = (e, cards) => {

  const F = document.getElementsByClassName("containerTitre")
  let index = Array.from(F).indexOf(e.target)

  const Moi = Array.from(document.getElementsByClassName(document.getElementsByClassName('projet')[index].children[0].className)).indexOf(document.getElementsByClassName('projet')[index].children[0])

  console.log(Moi)

  console.log(index);
  
  const htmlString = ReactDOMServer.renderToStaticMarkup(cards[0]);
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const className = doc.querySelector(htmlString.split("<")[1].split(" ")[0]).getAttribute('class');
  const card = document.getElementsByClassName(className)[Moi];
  let vw = window.innerWidth / 100;
  let rect = card.getBoundingClientRect();
  let L = (rect.width * cards.length) + ((cards.length - 1) * 10) + ((5 * vw) * 2)
  // let L = (rect.width * cards.length) + (((50 * vw) * 10/100) * 2) + ((5 * vw) * 2)
  let nb = 0
  while (L > window.innerWidth) {
      L = L - rect.width
      nb += 1
  }
  if (cards.length !==1){
    if (Math.round(cards.length / (cards.length - nb)) >= cards.length / (cards.length - nb)){
      H = rect.height * Math.round(cards.length / (cards.length - nb)) + (50 * ((Math.round(cards.length / (cards.length - nb))) - 1))
    }else{
      H = rect.height * (Math.round(cards.length / (cards.length - nb)) + 1) + (50 * ((Math.round(cards.length / (cards.length - nb)) + 1) - 1))
    }
  } else {
    H = rect.height
  }

  var projet = document.getElementsByClassName('projet')[index];
  const fleche = document.getElementsByClassName('fleche')[index];
  
  while (!projet){
    projet = document.getElementsByClassName('projet')[index];
  }

  if (projet.style.height!=="0px") {
    fleche.style.transform = "rotateZ(-90deg)";
    projet.style.height = "0";
    projet.style.padding = "0px";
    // projet.style.border = "var(--bleu) 1px solid"
  } else {
    console.log(H)
    fleche.style.transform = "rotateZ(0deg)";            
    projet.style.height = H + "px";
    if (ismobile) {
      projet.style.padding = "10%";
    } else {
      projet.style.padding = "5%";
    }
    // projet.style.border = "rgb(119 119 119) 1px solid"
  }
};

function Partie({cards, titre, id}) {
    const [gridTemplateColumns, setGridTemplateColumns] = useState('auto '.repeat(2));
    useEffect(() => {
      
        const handleResize = () => {
            ismobile = window.innerWidth <= 728
            const htmlString = ReactDOMServer.renderToStaticMarkup(cards[0]);
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            const className = doc.querySelector(htmlString.split("<")[1].split(" ")[0]).getAttribute('class');
            const card = document.getElementsByClassName(className)[0];
            const projetMoi = document.getElementsByClassName('projet')[id];
            let vw = window.innerWidth / 100;
            let rect = card.getBoundingClientRect();
            // console.log(className + " " +(rect.width * cards.length))
            let L = (rect.width * cards.length) + ((cards.length - 1) * 10) + (((50 * vw) * 5/100) * 2) + ((5 * vw) * 2)
            // let L = (rect.width * cards.length) + (((50 * vw) * 10/100) * 2) + ((5 * vw) * 2)
            console.log("Window : " + window.innerWidth)
            let nb = 0
            while (L > window.innerWidth) {
                L = L - rect.width
                nb += 1
            }

            if (cards.length !==1){
              if (Math.round(cards.length / (cards.length - nb)) >= cards.length / (cards.length - nb)){
                H = rect.height * Math.round(cards.length / (cards.length - nb)) + (50 * ((Math.round(cards.length / (cards.length - nb))) -1))
              }
              else{
                H = rect.height * (Math.round(cards.length / (cards.length - nb)) + 1) + (50 * ((Math.round(cards.length / (cards.length - nb)) + 1) -1))
              }
            } else {
              H = rect.height
            }
            if (projetMoi.style.height!=="0px") {
              projetMoi.style.height = H + "px";
            }
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

export default Partie;