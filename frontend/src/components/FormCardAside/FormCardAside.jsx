import { useSelector } from 'react-redux'
import './style.css'

const FormCardAside = () => {

  const {animationState, formStage} = useSelector(state => state.loginAnimation)

  return (
    <>{
      formStage === 0 ? 
      <div className={animationState === 0 ? "asideCard openLeft" : 'asideCard outCardAnimation'} id="card1">
        <img src="imgs/logo.svg" className='logoCard' alt="logo com os dizeres LOXCOM" />
        <div className="column">
        <h2>Seja bem-vindo(a)</h2>
        <span>Maior meio de vendas <br/> online</span>
        </div>
        <img src="imgs/vector1.png" className='vectorCard' alt="Imagem de um carrinho de supermercado com varios presentes." />
      </div>
      :
      <div className={animationState >= 1 ? "asideCard openRight" : 'asideCard outCardAnimation'} id="card2">
        <img src="imgs/logo.svg" className='logoCard' alt="logo com os dizeres LOXCOM" />
        <div className="column">
        <span>
          Antes de permitir seu acesso, precisamos de alguns dados!
        </span>
        </div>
        <img src="imgs/vector2.png" className='vectorCard' alt="Imagem de um carrinho de supermercado com varios presentes." />
      </div>
    }
      
      
    </>
  )
}

export default FormCardAside