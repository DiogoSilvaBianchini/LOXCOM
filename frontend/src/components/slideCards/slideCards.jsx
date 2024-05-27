import './style.css'
import Card from '../card/card.jsx'
// eslint-disable-next-line react/prop-types
const SlideCards = ({title, cardDescribe = [], max}) => {
    const renderProducts = () => {
        let products = []
        for(let i = 0; i < max; i++){
           products.push(
                <Card key={i} 
                    productId={cardDescribe[i]._id}
                    img={`${cardDescribe[i].imgs[0]}`} 
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
                cardDescribe && renderProducts()
            }
            </div>
        </section>
    )
}

export default SlideCards