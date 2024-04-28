import './style.css'
import { useAppContext } from '../../hooks/useAppContext'
import Card from '../../components/card/card'
import useFetch from '../../hooks/useFetch'

const SandBox = () => {
    const {cookie} = useAppContext()
    const {data, error, laod} = useFetch("http://localhost:8082/products", "GET", cookie.token)
    
    console.log(data, error, laod)
    return (
        <div className='containerTest'>
            <h2>produtos</h2>
           {
                data && data.map((e) => (
                        <div key={e._id}>
                            <Card productId={e._id} title={e.title} avaliation={5} img={e.imgs[0]}  price={e.price} />
                        </div>
                    )
                )
           }
        </div>
    )
}

export default SandBox