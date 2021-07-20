import './Card.css'

function Card({title = "",country="" ,temp = "", desc = "", ...rest}) {
    return(
        <div className='card' { ...rest }>
            <span className="title" title={title}> {title}</span> 
            <span>{country}</span>
            <span className="temp">{temp}°C</span>
            <span className="desc">{desc}</span>
        </div>
    );
}

export default Card;