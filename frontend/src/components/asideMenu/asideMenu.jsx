import './style.css'
import { Link, NavLink } from "react-router-dom"
import TvIcon from '@mui/icons-material/Tv';
import ChairIcon from '@mui/icons-material/Chair';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const asideMenu = ({active, setActive}) => {
  return (
    <aside hidden={active} className='mobileMenu'>
        <button className='closeButton' onClick={() => setActive(true)}><ArrowBackIcon /></button>
        <ul>
            <li>
                <Link to="/" className='logo'><img src="/imgs/logo.svg" alt="logo loxcom"/></Link>
            </li>
            <li>
                <NavLink to="/eletronicos" className={({isActive}) => isActive ? "active":""}>
                    <TvIcon />
                    <span>Eletrônicos</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/domesticos" className={({isActive}) => isActive ? "active":""}>
                    <ChairIcon />
                    <span>Moveís</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/games" className={({isActive}) => isActive ? "active":""}>
                    <VideogameAssetIcon />
                    <span>Games</span>
                </NavLink>
            </li>
        </ul>
        <ul className='iconMenu'>
            <li>
                <NavLink to="/perfil" className={({isActive}) => isActive ? "active":""}>
                    <PersonIcon />
                </NavLink>
            </li>
            <li>
                <NavLink to="/perfil" className={({isActive}) => isActive ? "active":""}>
                    <ShoppingCartIcon />
                </NavLink>
            </li>
            <li>
                <NavLink to="/perfil" className={({isActive}) => isActive ? "active":""}>
                    <FavoriteIcon />
                </NavLink>
            </li>
        </ul>
    </aside>
  )
}

export default asideMenu