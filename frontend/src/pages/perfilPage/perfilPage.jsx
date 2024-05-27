import './style.css'

import Header from "../../components/header/header.jsx"
import CardInfo from '../../components/cardInfo/CardInfo.jsx'
import useFetch from '../../hooks/useFetch'
import { useAppContext } from '../../hooks/useAppContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {consultCEP} from '../../utils/consultaCEP.js'
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductList from '../../components/productList/productList.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {setFormState} from '../../redux/perfilFormStateSlice.js'

// eslint-disable-next-line react/prop-types
const PerfilPage = () => {
  const { cookie } = useAppContext()
  const navigate = useNavigate()

  const [address, setAddress] = useState(null)
  
  const { data, status } = useFetch("/user/userById", "GET", cookie.token)
  const { data: userProducts } = useFetch(`/products/listProducts`, "GET", cookie.token)
  
  const dispatch = useDispatch()
  const { formState } = useSelector(state => state.perfilState)

  useEffect(() => {
    if(status === 401){
      navigate("/login")
    }
  },[status, navigate])

  useEffect(() => {
    const findAdress = async () => {
      const findAddress = await consultCEP(data.CEP)
      setAddress({
        cep:findAddress.cep, 
        street: findAddress.logradouro, 
        city: findAddress.localidade, 
        district: findAddress.bairro,
        state: findAddress.uf
      })
    }

    data && findAdress()
  }, [data])

  return ( 
    <div className='containerPerfil'>
        <Header />
        <div className="content">
          <aside>
            <button className={formState === 0 ? "activeButtonAside":""} onClick={() => dispatch(setFormState({stage: 0}))}><PersonIcon /></button>
            <button className={formState === 1 ? "activeButtonAside":""} onClick={() => dispatch(setFormState({stage: 1}))}><InventoryIcon /></button>
            <button className={formState === 2 ? "activeButtonAside":""} onClick={() => dispatch(setFormState({stage: 2}))} ><FavoriteIcon /></button>
          </aside>
          <div className="perfilContainer">
            {
              formState === 0 ?
              <>
                {data && <CardInfo listInfo={[{name: data.name}, {email: data.email}, {phone: data.phone}]} title={"Dados do usuario"} Icon={PersonIcon}/>}
                {address && <CardInfo listInfo={[{CEP: address.cep}, {city: address.city},{address: address.street}, {"district": address.district}, {"state": address.state}]} title={"Informações de entrega"} Icon={LocalShippingIcon}/>}
              </>:
              userProducts && 
                <>
                  {formState === 1 && <ProductList Icon={PersonIcon} title="Seus Produtos" products={userProducts.products}/>}
                  {formState === 2 && <ProductList Icon={PersonIcon} title="Seus Favoritos" products={userProducts.favProducts}/>  }        
                </>
            }
          </div>
        </div>
    </div>
  )
}

export default PerfilPage