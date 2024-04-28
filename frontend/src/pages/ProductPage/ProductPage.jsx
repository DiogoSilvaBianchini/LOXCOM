import "./style.css"
import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { useAppContext } from "../../hooks/useAppContext"
import Header from "../../components/header/header"
import SlideCards from "../../components/slideCards/slideCards.jsx"
import Footer from "../../components/footer/footer.jsx"
import { useEffect, useState } from "react"
import {renderStars} from '../../utils/renderStars'
import {formatPrice} from '../../utils/formatPrice.js'

const ProductPage = () => {
    const [actualImage, setActualImage] = useState()
    const [stock, setStock] = useState(1)
    const {productId} = useParams()
    const {cookie} = useAppContext()
    const {data} = useFetch(`http://localhost:8082/products/${productId}`, "GET", cookie.token)
    const {data:product} = useFetch(`http://localhost:8082/products/`, "GET")

    useEffect(() => {
        if(data){
            setActualImage(data.imgs[0])
        }
    },[data])

    useEffect(() => {
        console.log(product)
    }, [product])
    
  return (
    <main className="containerProducts">
        <Header />
        {
            data && 
            <div className="containerProduct">
                <div className="showRoomProducts">
                    <div className="prototypeImage">
                        {
                            data.imgs.map((product, i) => (
                                <button onMouseEnter={() => setActualImage(product)} key={i}>
                                    <img src={`/productsImages/${product}`}/>
                                </button>
                            ))
                        }
                    </div>
                    <div className="imageProduct">
                        <img src={`/productsImages/${actualImage}`}/>
                        <div className="mobileButtonsImg">
                        {
                            data.imgs.map((product, i) => (
                                <button onMouseEnter={() => setActualImage(product)} key={i}>
                                    <img src={`/productsImages/${product}`}/>
                                </button>
                            ))
                        }
                    </div>
                    </div>
                    <div className="content">
                        <div className="titleAvaliation">
                            <h2>{data.title}</h2>
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
                            <input type="text" onChange={(e) => setStock(e.target.value)} value={stock}/>
                        </div>
                        <div className="buttons">
                            <button className="agree-btn">Comprar</button>
                            <button className="agree-btn">Adicionar ao carrinho</button>
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
        <Footer />
    </main>
  )
}

export default ProductPage