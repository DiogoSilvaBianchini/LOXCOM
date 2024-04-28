import './style.css'
import Header from '../../components/header/header.jsx'
import SlideCards from '../../components/slideCards/slideCards.jsx'
import CardLarge from '../../components/cardLarge/CardLarge.jsx'
import Footer from '../../components/footer/footer.jsx'
import useFetch from '../../hooks/useFetch.jsx'
import { useAppContext } from '../../hooks/useAppContext.jsx'

const Home = () => {
    const {cookie} = useAppContext()
    const {data} = useFetch("http://localhost:8082/products", "GET", cookie.token)
    console.log(data)
    return(
        <>
            {
                data && <>
                    <Header />
                    <main className="container">
                        <div className='background'>
                        </div>
                        <SlideCards title="Para você" cardDescribe={data} max={data.length}/>
                        <div className='anuncio'>
                            <span>Eletronicos com 20% de desconto</span>
                            <span className='stroke'>Garanta já o seu</span>
                            <button className='agree-btn'>Conferir</button>
                        </div>
                        <SlideCards title="Mais vendidos" cardDescribe={data} max={data.length}/>
                        <section className='categorys'>
                            <CardLarge title="DOMESTICOS" urlImg="categoria1"/>
                            <CardLarge title="ELETRÔNICOS" urlImg="categoria2"/>
                            <CardLarge title="GAMERS" urlImg="categoria3"/>
                        </section>
                        <SlideCards title="Ultimas compras" cardDescribe={data} max={data.length}/>
                        <Footer />
                    </main> 
                </>
            }
        </>
    )
}

export default Home