import './style.css'
import {NavLink, Link} from 'react-router-dom'
import { useAppContext } from '../../hooks/useAppContext';
import AsideMenu from '../asideMenu/asideMenu'

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';


const Header = () => {
    const { cookie } = useAppContext()
    const [menu, setMenu] = useState(true)
    return (
        <header>
            <div className="row">
                <Link to="/" className='logo'><img src="/imgs/logo.svg" alt="Logo LOXCOM" /></Link>
                <div className="search-bar">
                    <input type="text" placeholder='Busque por produtos'/>
                    <button className="agree-btn">Buscar</button>
                    <button className='menuButton' onClick={() => setMenu(!menu)}><MenuIcon/></button>
                </div>
            </div>
            <div className="row links">
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
                    <NavLink to={!cookie ? "/login":"/perfil"} className={({isActive}) => isActive ? "activeIconBtn":""}>
                        <PersonOutlineOutlinedIcon />
                    </NavLink>
                    <NavLink to="/cart" className={({isActive}) => isActive ? "activeIconBtn":""}>
                        <ShoppingCartOutlined />
                    </NavLink>
                    <NavLink to="/favority" className={({isActive}) => isActive ? "activeIconBtn":""}>
                        <FavoriteOutlinedIcon />
                    </NavLink> 
                </div>
            </div>
            <AsideMenu active={menu} setActive={setMenu}/>
        </header>
    )
}

export default Header