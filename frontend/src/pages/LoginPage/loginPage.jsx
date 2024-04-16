import './style.css'
import {GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import { useState } from 'react'
import Lodding from '../../components/loding'

const LoginPage = () => {
  const [err, setErr] = useState("")
  const [load, setLoad] = useState(true)

  const handdleSubmit = (e) => {
    e.preventDefault()
    setLoad(!load)
  }
  const onSucessOAuth = async (usetToken) => {
    const token = jwtDecode(usetToken.credential)
    const userPayLoad = {email: token.email}

    const auth = await fetch("http://localhost:8082/user/loginForGoogle", {
      headers: {"Content-Type":"application/json"},
      method: "POST",
      body: JSON.stringify(userPayLoad)
    }).then(res => res.json()).then(json => {
      return json
    })

    if(auth.status == 401){
      setErr(auth.message)
    }
  }

  return (
    <div className="loginContainer">
        <h2>Faça login</h2>
        <form onSubmit={handdleSubmit}>
           {
            !load ? 
            <>
              <label htmlFor="">
                  <span className={err && "error-text"}>E-mail</span>
                  <input type="email" className={err && "error"}/>
                  {err && <span className='small error-text'>{err}</span>}
              </label>
              <label htmlFor="">
                  <span>Senha</span>
                  <input type="password" />
              </label>
              
            </>:
            <>
              <Lodding />
            </>
            
           }
           <button>Login</button>
        </form>
        <div className="auth">
          <GoogleLogin onSuccess={credentials => onSucessOAuth(credentials)} onError={err => console.log(err)}/>
        </div>
    </div>
  )
}

export default LoginPage