import './style.css'
import Header from "../../components/header/header"
import FormPayment from '../../components/formPayment/FormPayment'
import useFetch from '../../hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import {formatPrice} from '../../utils/formatPrice.js'
import { useAppContext } from '../../hooks/useAppContext.jsx'

const ProductPaymith =  () => {
    const { productId } = useParams()
    const {data: product} = useFetch(`${process.env.SERVER_URL}/products/${productId}`, "GET")
    const {cookie} = useAppContext()
    const navigate = useNavigate()

    if(cookie.token === null){
      navigate("/login")
    }
    return (
      <div className="containerPayment">
          <Header />
          
          {product &&
            <div className='payment'>
              <div className="productCard">
                <img src={`/productsImages/${product.imgs[0]}`} alt="product image" />
                <div className="info">
                  <h2>{product.title}</h2>
                  <span>{formatPrice(product.price)}</span>
                </div>
              </div>
              <FormPayment price={product.price} userId={cookie.token} productId={productId}/>
            </div>
          }
      </div>
    )
}

export default ProductPaymith