import './style/CardCopy.css'
import python from "./asset/img/pythonCardV2.png"
import JS from "./asset/img/JSCard.png"

const turnF = (e) => {
  const F = document.getElementsByClassName("front");
  const index = Array.from(F).indexOf(e.target)
  const B = document.getElementsByClassName("back")[index];
  
  // const moi = document.getElementsByClassName("card")[index];

  // moi.style.zIndex = 99;

  e.target.style.transform = 'rotate3d(0, 1, 0, 180deg)';
  B.style.transform = 'rotate3d(0, 1, 0, 0deg)';
};

const turnB = (e) => {
  const B = document.getElementsByClassName("back");
  const index = Array.from(B).indexOf(e.target)
  const F = document.getElementsByClassName("front")[index];

  e.target.style.transform = 'rotate3d(0, 1, 0, -180deg)';
  F.style.transform = 'rotate3d(0, 1, 0, 0deg)';
};

const moveF = (e) => {
  e.currentTarget.style.zIndex = 99;
};

const moveB = (e) => {
  e.currentTarget.style.zIndex = "";
};

const imageMap = {
  python: python,
  JS : JS
};

function Card({key, index, data}) {
  console.log(window["index"]);
  console.log(python);
  return (
  <div className='card' onMouseEnter={moveF} onMouseLeave={moveB} id={index}>
      <div className="inner">
          <div className='front' onClick={turnF} style={{background:`url('${imageMap[data]}')`, backgroundSize:"cover"}}></div>
          <div className='back' onClick={turnB}></div>
      </div>
  </div>
  );
}
  export default Card;