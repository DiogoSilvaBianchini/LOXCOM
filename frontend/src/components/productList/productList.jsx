import "./style.css"
import Card from '../card/card'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const ProductList = ({title="", products=[]}) => {
    const [search, setSearch] = useState("")   
    const [listProducts, setListProducts] = useState([])

    useEffect(() => {
        setListProducts(products)
    },[products])

    const filterConfig = (product) => {
        const title = product.title.toLowerCase()
        const searchLower = search.toLowerCase()
        return title.includes(searchLower)
    }

    const filterProducts = () => {
        const filter = products.filter(product => filterConfig(product))
        if(filter.length > 0){
            setListProducts(filter)
        }else{
            setListProducts(products)
        }

    }

    return (
        <div className="productsContainer">
            <div className="search">
                <h2>{title}</h2>
                <label htmlFor="search">
                    <input type="text" 
                        autoComplete="none" 
                        onChange={e => setSearch(e.target.value)} 
                        onKeyUp={filterProducts} 
                        value={search}/>
                    <span><SearchIcon /></span>
                </label>
            </div>
            <ul>
                {
                    
                    listProducts && listProducts.map(product => (
                        <li key={product._id}>
                            <Card productId={product._id} img={product.imgs[0]} title={product.title} price={product.price}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ProductList