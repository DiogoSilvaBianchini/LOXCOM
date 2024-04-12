import './style.css'
import Card from '../card'
// eslint-disable-next-line react/prop-types
const SlideCards = ({title, cardDescribe = [], max}) => {
    
    const renderProducts = () => {
        let products = []
        for(let i = 0; i < max; i++){
            
           products.push(
                <Card key={i} 
                    img={`/imgs/${cardDescribe[i].urlImg}`} 
                    title={cardDescribe[i].title} 
                    price={cardDescribe[i].price} 
                    category={cardDescribe[i].category} 
                    avaliation={cardDescribe[i].avaliation}
                />
           )
        }
        return products
    }
    
    return (
        <section className='products-container'>
            <h2>{title}</h2>
            <div className="products">
            {
                renderProducts()
            }
            </div>
        </section>
    )
}

export default SlideCards