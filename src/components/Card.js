import './Card.css'

function Card({title = "",country="", icon="" ,temp = "", desc = "", ...rest}) {
    return(
        <div className='card' { ...rest }>
            <span className="title" title={title}> {title}</span> 
            <span>{country}</span>
            <div className="temp">
                <img  src={icon} alt=""></img>
                <span> {temp}°C </span>
            </div>
            <span className="desc"> {desc} </span>
        </div>
    );
}

export default Card;