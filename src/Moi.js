import './style/Moi.css'

function Moi({texte}) {
    return (
        <div className='pres'> 
            <p dangerouslySetInnerHTML={{ __html: texte }} />
        </div>
    )
}

export default Moi