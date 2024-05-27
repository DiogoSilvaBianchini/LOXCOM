import './style.css'
import { useEffect, useState } from 'react'
import SmartButton from '../smartButton/SmartButton'
import InputSimple from '../inputSimple/inputSimple'
import { useDispatch, useSelector } from 'react-redux'
import { nextAnimation, nextForm } from '../../redux/loginAnimationSlice'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useAppContext } from '../../hooks/useAppContext'

const FormLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { httpRequest, data, error } = useFetch("/user/login", "POST")
    const { setCookies } = useAppContext()
    const navigate = useNavigate()

    const { animationState } = useSelector(state => state.loginAnimation)
    const dispatch = useDispatch()

    const nextAnimationStage = () => {
        dispatch(nextAnimation())
    }

    const nextFormStage = () => {
        if(animationState === 1){
            dispatch(nextForm())
        }
    }

    const handdleSubmite = async (e) => {
        e.preventDefault()
        if(email.length > 0 || password.length > 0){
            await httpRequest({email, password})  
        }
    }

    useEffect(() => {
        if(data){
            setCookies("token", data)
            const previousUrl = localStorage.getItem("back_path")
            navigate(previousUrl)
        }
    },[data, navigate, setCookies])
    
  return (
    <div className={animationState === 0 ? "formSpace":"formSpace outFormAnimation"} onAnimationEnd={nextFormStage}>
        <h2>Login-in</h2>
        <form onSubmit={(e) => e.preventDefault()}>
            <span className='error-text'>{error}</span>
            <InputSimple 
                title="E-mail" 
                placeholder="userName@email.com" 
                type="email" 
                changeValue={setEmail}
                value={email}/>
            <InputSimple 
                title="Senha" 
                placeholder="••••••••" 
                type="password" 
                changeValue={setPassword} 
                value={password}/>
            <SmartButton action={handdleSubmite} styleState="darkButton">Login</SmartButton>
            <SmartButton action={nextAnimationStage} styleState="outtlineButton">Não tenho conta</SmartButton>
        </form>
    </div>
  )
}

export default FormLogin