import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice.js'
import './style.css'
import { memo, useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';

// eslint-disable-next-line react/prop-types
const Card = memo(function Card({productId, img, title, price}){
    const navigate = useNavigate()    
    const [load, setLoad] = useState(false)
    
    return (
        <div className='card'>
            <div className='containerImage'>
                {!load && <ImageIcon />}
                <img className={load ? "":"block"} src={`productsImages/${img}`} onLoad={() => setLoad(true)} alt="imagem do produto" />
            </div>
            <div className="contentCard">
                <span className='title'>{title}</span>
                <div className="priceContainer">
                    <h3>{formatPrice(price)}</h3>
                    <span className='smallText'>ou em até 10x {`${formatPrice(price/10)}`}</span>
                </div>
            </div>
            <button className='buy-Btn' onClick={() => navigate(`/product/${productId}`)}>Escolha o seu</button>
        </div>
    )
})

export default Card