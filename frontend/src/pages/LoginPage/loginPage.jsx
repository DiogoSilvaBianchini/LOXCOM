import './style.css'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useAppContext} from '../../hooks/useAppContext'
import Lodding from '../../components/loading/loading'
import useFetch from '../../hooks/useFetch'


// eslint-disable-next-line react/prop-types
const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {setCookies, listFavorityIds} = useAppContext()

  
  const navigate = useNavigate()
  const { data: token, load, error, httpRequest } = useFetch("http://localhost:8082/user/login","POST")

  const haddleSubmite = async (e) => {
    e.preventDefault()
     await httpRequest({email, password})
  }

  useEffect(() => {
    if(token){
      setCookies('token', token)
      
      fetch("http://localhost:8082/user/userById", {
        headers: {"Content-Type":"application/json", token},
        method: "GET"
      }).then(res => res.json).then(user => listFavorityIds.push(user.favorityProducts))
      
      navigate("/perfil")
    }
  },[token, navigate, setCookies, listFavorityIds])

  return (
    <div className="loginContainer">
        <Link to={"/"}>
          <img src="./imgs/logoDark.svg" alt="" />
        </Link>
        <h2>{!load ? "Faça login":"Aguarde"}</h2>
        <form onSubmit={haddleSubmite}>
          <label htmlFor="">
                <span className={error && "error-text"}>E-mail</span>
                <input type="email" disabled={!load ? false:true} value={email} onChange={e => setEmail(e.target.value)} className={error && "error"}/>
                {error && <span className='small error-text'>{error}</span>}
            </label>
            <label htmlFor="">
                <span className={error && "error-text"}>Senha</span>
                <input className={error && "error"} type="password" disabled={!load ? false:true} value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
           <button className={!load ? "btnLogin":"loadBtn"}>{!load ? "Login" : <Lodding color='#c1c1c1'/>}</button>
        </form>
    </div>
  )
}

export default LoginPage