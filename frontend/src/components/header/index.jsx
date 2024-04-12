import './style.css'
import {NavLink, Link} from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

const Header = () => {
    return (
        <header>
            <div className="row">
                <Link to="/"><img src="/imgs/logo.svg" alt="Logo LOXCOM" /></Link>
                <div className="search-bar">
                    <input type="text" />
                    <button className="agree-btn">Buscar</button>
                </div>
            </div>
            <div className="row">
                <ul>
                    <li>
                        <NavLink to="/" className={({isActive}) => isActive ? "active":""}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/eletronicos" className={({isActive}) => isActive ? "active":""}>Eletrônicos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/domesticos" className={({isActive}) => isActive ? "active":""}>Domesticos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/games" className={({isActive}) => isActive ? "active":""}>Games</NavLink>
                    </li>
                </ul>
                <div className="icons">
                <button>
                    <PersonOutlineOutlinedIcon />
                </button>
                <button>
                    <ShoppingCartOutlined />
                </button>
                <button>
                    <FavoriteOutlinedIcon />
                </button> 
                </div>
            </div>
        </header>
    )
}

export default Header