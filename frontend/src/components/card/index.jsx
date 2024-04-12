import './style.css'
import { ShoppingCartOutlined } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { common } from '@mui/material/colors'

// eslint-disable-next-line react/prop-types
const Card = ({img, title, price, category, avaliation}) => {

    const renderStars = () => {
        const arr = []

        if(avaliation > 5){
            avaliation = 5
        }

        for(let i = 0; i < avaliation; i++){
            arr.push(<StarIcon key={i}/>)
        }

        if(avaliation < 5){
            const difference = 5 - avaliation
            for(let i = 0; i < difference;i++){
                arr.push(<StarOutlineIcon key={i+4} />)
            }
        }

        return arr
    }

    return (
        <div className='card'>
            <img src={img} alt="imagem do produto" />
            <div className="row">
                <div className="stars">
                    {
                        renderStars()
                    }
                </div>
                <span>{category}</span>
            </div>
            <div className="column">
                <h3>{title}</h3>
                <span>R$ {price}</span>
            </div>
            <button className='agree-btn'><ShoppingCartOutlined sx={{ color: common.white }}/>Comprar</button>
        </div>
    )
}

export default Card