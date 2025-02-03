import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoW from './asset/img/logoDiscordW.png'

function Comment ( {username, comment, rate, pdp} ) {
    let diff = 5 - rate
    return (
        <div className='commentBox'>
            <div className='header'>
                {pdp ? <img src={pdp} />:<img src={logoW} />}
                <h1>{username}</h1>
            </div>
            {[...Array(rate)].map((_, i) => (
                <FontAwesomeIcon key={i} className="star" icon={faStar} style={{color:"#F79426"}}/>
            ))}
            {[...Array(diff)].map((_, i) => (
                <FontAwesomeIcon key={i} className="star" icon={faStar}/>
            ))}
    
            <p>{comment}</p>
        </div>      
    );
};

export default Comment;