import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextAnimation, backAnimation } from '../../redux/loginAnimationSlice.js'

const SandBox = () => {
    const nameRef = useRef("")

    const dispatch = useDispatch()
    const selector = useSelector(state => state.loginAnimation)

    const handdleSubmite = () => {
        dispatch(nextAnimation())
    }

    const logOut = () => {
        dispatch(backAnimation())
    }

    const check = () => {
        console.log(selector)
    }

    return (
        <div>
            <input type="text" ref={nameRef}/>
            <button onClick={handdleSubmite}>Enviar</button>
            <button onClick={logOut}>cancelar</button>
            <button onClick={check}>check State</button>
        </div>
    )
}

export default SandBox