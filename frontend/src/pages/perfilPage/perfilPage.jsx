import './style.css'
import Card from "../../components/card/card.jsx"
import Header from "../../components/header/header.jsx"
import useFetch from '../../hooks/useFetch'
import Loading from '../../components/loading/loading.jsx'
import PerfilAside from '../../components/perfilAside/perfilAside.jsx'

import { useAppContext } from '../../hooks/useAppContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
const PerfilPage = () => {
  const { cookie } = useAppContext()
  const [screeStage, setScreeStage] = useState(1)
  const [renderProducts, setRenderProducts] = useState([])

  const { data, status } = useFetch("http://localhost:8082/user/userById", "GET", cookie.token )
  const { data: products } = useFetch("http://localhost:8082/products/getAllProductUser", "GET", cookie.token)
  console.log(products, data)
  const navigate = useNavigate()

  useEffect(() => {
    if(status === 401){
      navigate("/login")
    }
  },[status, navigate])

  useEffect(() => {
    if(products){
      if(screeStage === 1){
        setRenderProducts(products.registerProducts)
      }else{
        setRenderProducts(products.favorityProducts)
      }
    }
  },[products, screeStage])
  
  const returnItens = () => {
    let container = document.getElementById("containerCards")
    

    if(container.className.includes("exitScreen")){
      container.classList.remove("exitScreen")
    }

    if(container.className.includes("returnScreen")){
      container.classList.remove("returnScreen")
    }else{
      container.classList.add("returnScreen")
    }

    
  }

  return (
    <div className='containerPerfil'>
        <Header />
        {
          data ? <>
            <div className="dashBordCotainer">
              <PerfilAside name={data.name} img={data.userImg} btnControl={screeStage} setScreen={setScreeStage}/>
              <div className="cardsContainer" id="containerCards" onAnimationEnd={returnItens}>
              {
                renderProducts && renderProducts.map((e) => (
                    <div key={screeStage === 1 ? `myProducts: ${e._id}`: screeStage === 2 ? `fav: ${e._id}` : `cart: ${e._id}`}>
                      <Card idProduct={e._id} title={e.title} img={e.imgs[0]} price={e.price} category={e.category}/>
                    </div>
                  ))
                }
              </div>
            </div>
            
            </>: <div className="lodding">
            <Loading />
          </div>
        }
        
    </div>
  )
}

export default PerfilPage