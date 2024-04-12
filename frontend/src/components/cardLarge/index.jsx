import './style.css'

// eslint-disable-next-line react/prop-types
const CardLarge = ({title, urlImg}) => {
    
    const titleAnimations = () => {
        document.querySelector(`#${urlImg}`).classList.remove("removeTitle")
        document.querySelector(`#${urlImg}`).classList.add("moveTitle")
    }

    const removeTitleAnimation = () => {
        document.querySelector(`#${urlImg}`).classList.remove("moveTitle")
        document.querySelector(`#${urlImg}`).classList.add("removeTitle")
    }

    return (
        <div onMouseEnter={titleAnimations} onMouseLeave={removeTitleAnimation} className="largeCardContainer" style={{backgroundImage: `url(./imgs/${urlImg}.png)`}}>
            <h2 id={urlImg}>{title}</h2>
        </div>
    )
}

export default CardLarge