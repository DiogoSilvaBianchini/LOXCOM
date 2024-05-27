import "./style.css"
import { useNavigate, useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { useAppContext } from "../../hooks/useAppContext"
import Header from "../../components/header/header"
import SlideCards from "../../components/slideCards/slideCards.jsx"
import { useEffect, useState } from "react"
import {renderStars} from '../../utils/renderStars'
import {formatPrice} from '../../utils/formatPrice.js'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductPage = () => {
    const [actualImage, setActualImage] = useState()
    const [stock, setStock] = useState(0)
    const [favButton, setFavButton] = useState(false)
    const { productId } = useParams()
    const { cookie } = useAppContext()

    const {data: product} = useFetch(`/products`, "GET")
    const {data} = useFetch(`/products/${productId}`, "GET", cookie.token)
    const {data: user} = useFetch(`/user/userById`, "GET", cookie.token)
    const { httpRequest } = useFetch(`/user/addFavority/${productId}`, "PUT", cookie.token)
    const navigate = useNavigate()

    useEffect(() => {
        if(data){
            setActualImage(data.imgs[0])
        }
    },[data])
    
    useEffect(() => {
        if(user){
            const listFavt = user.favorityProducts
            for(let id of listFavt){
                if(productId === id){
                    setFavButton(true)
                }
            }
        }
    }, [user, productId])

    const addFavority = async () => {
        await httpRequest()
        setFavButton(!favButton)
    }

    const swapImage = (e, product) => {
        if(!e.target.className.includes("activeButton")){
            const list = document.querySelectorAll(".activeButton")
            for(let btn of list){
                btn.classList.remove("activeButton")
            }
            e.target.classList.add("activeButton")
            setActualImage(product)
        }   
    }

    const buyPage = () => {
        navigate(`/admin/${productId}/${stock}`)
    }

  return (
    <main className="containerProductsPage">
        <Header />
        {
            data && 
            <div className="containerProduct">
                <div className="showRoomProducts">
                    <div className="prototypeImage">
                        {
                            data.imgs.map((product, i) => (
                                <button key={i}>
                                    <img onMouseEnter={(e) => swapImage(e, product)} src={`/productsImages/${product}`}/>
                                </button>
                            ))
                        }
                    </div>
                    <div className="imageProduct">
                        <div className="titleAvaliation mobile">
                            <h2>{data.title}</h2>
                            <div className="rowDescribe">
                                <span>{data.category.toUpperCase()}</span>
                                <div className="stars">
                                    {renderStars(4)}
                                </div>
                            </div>
                        </div>
                        <img className="principalImage" src={`/productsImages/${actualImage}`}/>
                        <div className="mobileButtonsImg">
                            {
                                data.imgs.map((product, i) => (
                                    <button onMouseEnter={() => setActualImage(product)} key={i}>
                                        <img onMouseEnter={(e) => swapImage(e, product)} src={`/productsImages/${product}`}/>
                                    </button>
                                ))
                            }
                        </div>
                        <div className="mobile">
                            <div className="price">
                                <h2>{formatPrice(data.price)}</h2>
                                <span>em 10x {formatPrice(data.price/10)}</span>
                            </div>
                            <div className="stock">
                                <span>Quantidade</span>
                                <input type="text" onChange={(e) => setStock(e.target.value)} value={stock}/>
                            </div>
                            <div className="buttons">
                                <button className="agree-btn" onClick={buyPage}><AddShoppingCartIcon /></button>
                                <button className="agree-btn" onClick={addFavority}>{favButton ? <FavoriteIcon />:<FavoriteBorderIcon />}</button>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="titleAvaliation">
                            <h2 className="title">{data.title}</h2>
                            <div className="rowDescribe">
                                <span>{data.category.toUpperCase()}</span>
                                <div className="stars">
                                    {renderStars(4)}
                                </div>
                            </div>
                        </div>
                        <div className="price">
                            <h2>{formatPrice(data.price)}</h2>
                            <span>em 10x {formatPrice(data.price/10)}</span>
                        </div>
                        <div className="stock">
                            <span>Quantidade</span>
                            <input type="text" onChange={(e) => !isNaN(e.target.value) && setStock(e.target.value)} value={stock}/>
                        </div>
                        <div className="buttons">
                            <div className="row">
                                <button className="agree-btn" onClick={buyPage}>Comprar</button>
                                <button className="circle-btn" onClick={buyPage}><AddShoppingCartIcon /> </button>
                                <button className="circle-btn" onClick={addFavority}>{favButton ? <FavoriteIcon />:<FavoriteBorderIcon />}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="describe">
                    <h2>Sobre o produto</h2>
                    <p>{data.describe}</p>
                </div>
                {
                    product && <SlideCards title="Produtos Semelhantes" cardDescribe={product} max={3}/>
                }
            </div>
        }
        
    </main>
  )
}

export default ProductPage