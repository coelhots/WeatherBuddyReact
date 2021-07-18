import './Card.css'

function Card({title = "", temp = "", desc = "", ...rest}) {
    return(
        <div className='card' { ...rest }>
            <span>{title}</span>
            <span className="temp">{temp}°C</span>
            <span className="desc">{desc}</span>
        </div>
    );
}

export default Card;