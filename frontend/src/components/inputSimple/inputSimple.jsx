import { useEffect } from 'react'
import './style.css'

// eslint-disable-next-line react/prop-types
const InputSimple = ({title="", id = title, error, placeholder, type, refInpt, value="", changeValue, max, mask, numberField}) => {
  
  const active = (e) => {
      let label = e.target.parentElement
      let titleInput = label.children[0]
      titleInput.classList.add("activeInput")
  }

  useEffect(() => {
    if(value.length > 0){
      let element = document.getElementById(`${id}`)
      element.classList.add("activeInput")

      let label = element.parentElement
      let titleInput = label.children[0]
      titleInput.classList.add("activeInput")
    }
  },[value, id])


  const changeActions = (e) => {
    const valor = e.target.value
    if(numberField){
      if(valor.includes("-") || !isNaN(valor)){
        changeValue(valor)
      }
    }else{
      changeValue(valor)
    }
  }

  return (
    <label htmlFor={title} className="simpleInput">
        <span>{title}</span>
        <input 
          id={id} 
          type={type} 
          placeholder={placeholder}
          onClick={e => active(e)}
          onChange={e => changeActions(e)}
          onKeyPress={e => mask && mask(e.target.value, changeValue)}
          ref={refInpt}
          value={value}
          maxLength={max}
          className={changeValue ? "":"blocked"}
          />
        <span className='errorText'>{error}</span>
    </label>
  )
}

export default InputSimple