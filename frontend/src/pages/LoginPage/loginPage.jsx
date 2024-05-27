import './style.css'
import FormLogin from '../../components/formLogin/FormLogin'
import FormCardAside from '../../components/FormCardAside/FormCardAside'

import FormRegister from '../../components/FormRegister/FormRegister'
import { useSelector } from 'react-redux'

const LoginPage = () => {
  const {formStage} = useSelector(state => state.loginAnimation)
  
  const closeFormAnimation = () => {
    setInterval(() => {
      const form = document.getElementById("formArea")
      form.classList.add("closeForm")
    }, [500])

    setInterval(() => {
      const form = document.getElementById("registerPage")
      form.classList.add("closeForm")
    }, [1100])
  }

  

  return (
    <main className='loginContainer' id='registerPage'>
      <div className="formArea" id='formArea' >
        {formStage === 0 ? <>
          <FormCardAside />
          <FormLogin/>
        </> : formStage > 0 && formStage < 3 ? <>
          <FormRegister/>
          <FormCardAside/>
        </> : formStage === 3 && <div className='endForm'>
          <h2 onAnimationEnd={closeFormAnimation}>Seja bem-vindo(a)!</h2>
        </div>
        }
      </div>
    </main>
  )
}

export default LoginPage