import './style.css'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Footer = () => {
    return (
        <footer>
            <div className="contact">
                <span><WhatsAppIcon/> (15) 99751-6834</span>
                <span><LocalPhoneIcon/> (15) 99751-6834</span>
                <span><MailOutlineIcon/> diogosilvabianchini@gmail.com</span>
            </div>
            <img src="./imgs/logo.svg" alt="logo LOXCOM" />
            <div className="logo">
                <img src="./imgs/logoDev.svg" alt="Logo do desenvolvedor Diogo Bianchini" />
                <span>Creted By Diogo Bianchini</span>
            </div>
        </footer>
    )
}

export default Footer