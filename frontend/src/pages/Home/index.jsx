import './style.css'
import SlideCards from '../../components/slideCards'
import CardLarge from '../../components/cardLarge'
import Footer from '../../components/footer'
import useFetch from '../../hooks/useFetch'

const Home = () => {
    const products = [
        {title: "Drone", price: 550.80, urlImg: "product1.png",category: "eletronics", avaliation: 4},
        {title: "Drone", price: 550.80, urlImg: "product1.png",category: "eletronics", avaliation: 4},
        {title: "Drone", price: 550.80, urlImg: "product1.png",category: "eletronics", avaliation: 4},
        {title: "Drone", price: 550.80, urlImg: "product1.png",category: "eletronics", avaliation: 4},
        {title: "Drone", price: 550.80, urlImg: "product1.png",category: "eletronics", avaliation: 4},
    ]

    return(
        <main className="container">
            <div className='background'>
            </div>
            <div className="floatCard">
               <div className="cards">
                    <img src="./imgs/img1.png" alt="Mouse, teclado sobre um mousepad preto em cima de uma mesa branco"/>
                    <img src="./imgs/img2.png" alt="Sofa em forma de L ma cor marron"/>
               </div>
            </div>
            <SlideCards title="Para você" cardDescribe={products} max={4}/>
            <div className='anuncio'>
                <span>Eletronicos com 20% de desconto</span>
                <span className='stroke'>Garanta já o seu</span>
                <button className='agree-btn'>Conferir</button>
            </div>
            <SlideCards title="Mais vendidos" cardDescribe={products} max={4}/>
            <section className='categorys'>
                <CardLarge title="DOMESTICOS" urlImg="categoria1"/>
                <CardLarge title="ELETRÔNICOS" urlImg="categoria2"/>
                <CardLarge title="GAMERS" urlImg="categoria3"/>
            </section>
            <SlideCards title="Ultimas compras" cardDescribe={products} max={4}/>
            <Footer />
        </main>
    )
}

export default Home