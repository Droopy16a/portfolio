import { useEffect, useState } from "react";
import "./style/Avis.css"
import { faStar, faPaperPlane, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoW from './asset/img/logoDiscordW.png'
import supabase from "./supabaseClient";
import Comment from './Comment';

let ismobile = window.innerWidth <= 728
let once = 0

function Avis({ rate }) {
    const comments = [
        { username: "Alice", comment: "Great product!", rate: 5 },
        { username: "Bob", comment: "Pretty good!", rate: 4 },
        { username: "Charlie", comment: "Could be better.", rate: 3 },
        { username: "David", comment: "Not a fan.", rate: 2 },
        { username: "Eve", comment: "Terrible experience!", rate: 1 },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [transition, setTransition] = useState(false);
    const [data, setData] = useState(comments);
    const [error, setError] = useState(null);
    const [selectedRating, setSelectedRating] = useState(1);
    const [avg, setAvg] = useState(rate);

    const user = JSON.parse(localStorage.getItem("user"))

    useEffect (() => {

        const handleResize = () => {
            ismobile = window.innerWidth <= 728;
            let vw = window.innerWidth / 100;
            const r = document.getElementsByClassName("Rprogress-bar");
            const spanRate = document.getElementsByClassName("spanRate")[0].getBoundingClientRect().width;
            const commentEl = document.getElementsByClassName("Comment")[0];
            const comment = commentEl ? commentEl.getBoundingClientRect().width : 0;
            const commentBox = document.getElementsByClassName("commentBox")[0].getBoundingClientRect().width;
            const C = document.getElementsByClassName("commentAvis")[0];
            console.log(Math.max(comment, commentBox));
            if (ismobile) {
                Array.from(r).map((v) => {
                    v.style.width =  `calc(80vw - ${spanRate}px - 10px)`
                })
                C.style.gridTemplateColumns = "auto";
                // ((100 * vw) - (((50 * vw) * 5/100) * 2) - ((5 * vw) * 2)) + "px";

            } else {
                Array.from(r).map((v) => {
                    v.style.width =  `calc(60vw - ${spanRate}px - ${Math.max(comment, commentBox)}px - 10px - 50px)`
                })
                C.style.gridTemplateColumns = "auto auto";
            };  
        };

        handleResize();

        if (once < 1){
            once += 1;
            fetchData();
        }

        window.addEventListener('resize', handleResize);

        const P = document.getElementsByClassName("Rprogress");
        Array.from(P).map((p,i)=>{
            const text = document.getElementsByClassName("rate-percentage")[i];
            let W = p.getAttribute("data-width");
            p.style.width = W + "%";
            text.style.width = W + "%";
        })

        const interval = setInterval(() => {
            handleNext();
        }, 5000);
        

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    })

    const handleNext = () => {
        setTransition(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
            setTransition(false);
        }, 300); // Duration should match CSS transition
    };

    const handlePrev = () => {
        setTransition(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
            setTransition(false);
        }, 300);
    };

    async function addComment(comment, rate) {
        const username = user.username
        const pdp = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : logoW
        const { data, error } = await supabase
          .from("comment")
          .insert([{ username, comment, rate, pdp }]);
      
        if (error) console.error(error);
        else console.log("User added:", data);
      }

    const fetchData = async () => {
        const { data, error } = await supabase
          .from('comment') // Replace with your table name
          .select('*'); // Select all columns
  
        if (error) {
          setError(error.message);
        } else {
          setData(data);
          const updatedAvg = [0, 0, 0, 0, 0];
          let tot = data.length
          console.log(tot);
          data.forEach(i => {
            let r = i["rate"];
            console.log(r);
            updatedAvg[5 - r] += 1;
          });

          updatedAvg.forEach((i, nb) => {
            updatedAvg[nb] = Math.round((updatedAvg[nb] / tot) * 100)
          });

          setAvg(updatedAvg);
        }
      };

      return (
        <div className='commentAvis'>
            <div className='Avis'>
                {avg.map((r, i) => (
                    <div className="rate-bar" key={i}>
                        <span className='spanRate'>{Math.abs(i - 5)} <FontAwesomeIcon className='star' icon={faStar} /></span>
                        <div className="Rbar">
                            <div className="rate-name">
                                <span className="rate-percentage">{r}%</span>
                            </div>
                            <div className="Rprogress-bar">
                                <div className="Rprogress" data-width={r}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="comment-slider">
                {data.length > 0 && (
                    <div className={`comment-wrapper ${transition ? "fade-out" : "fade-in"}`} onClick={()=>{handleNext(); fetchData()}}>
                        <Comment
                            username={data[currentIndex]?.username}
                            comment={data[currentIndex]?.comment}
                            rate={data[currentIndex]?.rate}
                            pdp={data[currentIndex]?.pdp}
                        />
                    </div>
                )}
            </div>
            <div className='Comment'>
                <div className="rating">
                    <input
                        type="radio"
                        id="star5"
                        name="rating"
                        value="5"
                        checked={selectedRating === 5}
                        onChange={() => setSelectedRating(5)}
                    />
                    <label className="star" htmlFor="star5" title="Awesome" aria-hidden="true" onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon className='star' icon={faStar} />
                    </label>
                    <input
                        type="radio"
                        id="star4"
                        name="rating"
                        value="4"
                        checked={selectedRating === 4}
                        onChange={() => setSelectedRating(4)}
                    />
                    <label className="star" htmlFor="star4" title="Great" aria-hidden="true" onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon className='star' icon={faStar} />
                    </label>
                    <input
                        type="radio"
                        id="star3"
                        name="rating"
                        value="3"
                        checked={selectedRating === 3}
                        onChange={() => setSelectedRating(3)}
                    />
                    <label className="star" htmlFor="star3" title="Very good" aria-hidden="true" onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon className='star' icon={faStar} />
                    </label>
                    <input
                        type="radio"
                        id="star2"
                        name="rating"
                        value="2"
                        checked={selectedRating === 2}
                        onChange={() => setSelectedRating(2)}
                    />
                    <label className="star" htmlFor="star2" title="Good" aria-hidden="true" onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon className='star' icon={faStar} />
                    </label>
                    <input
                        type="radio"
                        id="star1"
                        name="rating"
                        value="1"
                        checked={selectedRating === 1}
                        onChange={() => setSelectedRating(1)}
                    />
                    <label className="star" htmlFor="star1" title="Bad" aria-hidden="true" onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon className='star' icon={faStar} />
                    </label>
                </div>
                <label htmlFor="inp" className="inp">
                    <input
                        type="text"
                        id="inp"
                        placeholder="&nbsp;"
                        onBlur={() => document.getElementsByClassName("rating")[0].style.height = "0px"}
                        onFocus={() => document.getElementsByClassName("rating")[0].style.height = "calc-size(fit-content, size)"}
                        onKeyDown={(e)=>{if (e.key === "Enter"){
                            const commentText = document.getElementById('inp').value;
                            const paper = document.getElementById('paper');
                            paper.classList.add('sended');
                            addComment(commentText, selectedRating);
                            document.getElementById('inp').value = "";
                            setSelectedRating(1)
                            fetchData();
                            setTimeout(() => {
                                paper.classList.remove('sended');
                            }, 1000);
                        }}}
                    />
                    <span className="label">Votre Avis...</span>
                    <span className="focus-bg"></span>
                    <button
                        className='send'
                        onClick={() => {
                            const commentText = document.getElementById('inp').value;
                            const paper = document.getElementById('paper');
                            paper.classList.add('sended');
                            addComment(commentText, selectedRating);
                            document.getElementById('inp').value = "";
                            setSelectedRating(1)
                            fetchData();
                            setTimeout(() => {
                                paper.classList.remove('sended');
                            }, 1000);
                        }}
                    >
                        <FontAwesomeIcon id='paper' icon={faPaperPlane} />
                    </button>
                </label>
            </div>
        </div>
    );
    
};

export default Avis