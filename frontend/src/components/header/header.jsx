import './style.css'
import {NavLink, Link, useLocation, useNavigate} from 'react-router-dom'
import AsideMenu from '../asideMenu/asideMenu'

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setFormState} from '../../redux/perfilFormStateSlice'
const Header = () => {
    const [menu, setMenu] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {formState} = useSelector(state => state.perfilState)

    useEffect(() => {
        localStorage.setItem("back_path", location.pathname)
    }, [location])
    
    const perfilRedirect = (stage) => {
        dispatch(setFormState({stage}))
        navigate("/perfil")
    }

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
                    <button onClick={() => perfilRedirect(0)} className={location.pathname === "/perfil" && formState === 0 ? "activeIconBtn" : ""}>
                        <PersonOutlineOutlinedIcon />
                    </button>
                    <button onClick={() => perfilRedirect(1)} className={location.pathname === "/perfil" && formState === 1 ? "activeIconBtn" : ""}>
                        <ShoppingCartOutlined />
                    </button>
                    <button onClick={() => perfilRedirect(2)} className={location.pathname === "/perfil" && formState === 2 ? "activeIconBtn" : ""}>
                        <FavoriteOutlinedIcon />
                    </button> 
                </div>
            </div>
            <AsideMenu active={menu} setActive={setMenu}/>
        </header>
    )
}

export default Header