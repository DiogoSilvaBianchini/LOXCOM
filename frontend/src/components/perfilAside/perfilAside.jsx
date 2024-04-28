import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const perfilAside = ({name, img, btnControl, setScreen}) => {
    const alterScreen = (stage) => {
        setScreen(stage)
        document.getElementById("containerCards").classList.add("exitScreen")
    }
  return (
    <aside>
        <div className="perfil">
            <img src={`./imgs/${img}`} alt="Imagem de usuario" />
            <h2>{name}</h2>
        </div>
        <button onClick={() => alterScreen(1)} className={btnControl == 1 ? "iconBtn activeIconBtn": "iconBtn"}> 
            <CreditCardIcon/> <span>Produtos</span>
        </button>
        <button onClick={() => alterScreen(2)} className={btnControl == 2 ? "iconBtn activeIconBtn": "iconBtn"}>
            <FavoriteOutlinedIcon/> <span>Favoritos</span>
        </button>
        <button onClick={() => alterScreen(3)} className={btnControl == 3 ? "iconBtn activeIconBtn": "iconBtn"}>
            <ShoppingCartOutlined/> <span>Registrar</span>
        </button>
    </aside>
  )
}

export default perfilAside