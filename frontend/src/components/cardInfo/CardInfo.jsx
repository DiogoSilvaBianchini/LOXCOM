import './style.css'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../../hooks/useAppContext';
import Loading from '../loading/Loading';

// eslint-disable-next-line react/prop-types
const CardInfo = ({listInfo=[], title="", Icon}) => {
  const [body, setBody] = useState(listInfo)
  const [edit, setEdit] = useState(false)
  const [modifiedField, setModifiedfield] = useState([])
  const {cookie} = useAppContext()
  const { httpRequest } = useFetch("/user", "PUT", cookie.token)


  const createClassField = () => {
    let classFild = title.replace(/\s+/g, '')
    return classFild.toLowerCase()
  }

  const classNameField = createClassField()

  const change = (e, element) => {
    const copyBody = [...body]
    const newValue = {[Object.keys(element)]: e.target.value}
    let indexElement = null;
    
    for(let index = 0; index < body.length; index++){
      if(Object.keys(body[index])[0] === Object.keys(element)[0]){
        indexElement = index
      }
    }
    
    copyBody.splice(indexElement, 1)
    copyBody.splice(indexElement, 0, newValue)

    modifiedField.length > 0 ? agreeModifiedField(newValue) : setModifiedfield([newValue])
    setBody(copyBody)
  }

  const agreeModifiedField = (newField) => {
    const filterFields = modifiedField.filter(field => Object.keys(field)[0] === Object.keys(newField)[0])
    if(filterFields.length === 0){
      setModifiedfield([...modifiedField, newField])
    }else{
      const filterBody = modifiedField.filter(field => Object.keys(field)[0] !== Object.keys(newField)[0])
      setModifiedfield([...filterBody, newField])
    }
  }

  const activeInputs = (fields) => {
    for(let field of fields){
      field.classList.toggle("activeInput")
    }
  }

  
  const editMode = () => {
    const field = document.getElementsByClassName(`${classNameField}`)
    activeInputs(field)
    setEdit(!edit)
    if(edit){
      saveButton()
    }
  }

  const rollbackBody = () => {
    const field = document.getElementsByClassName(`${classNameField}`)
    setBody(listInfo)
    activeInputs(field)
    setEdit(false)
  }

  const saveButton = async () => {
    let body = {}
    modifiedField.map(element => [
      body[Object.keys(element)] = Object.values(element)[0]
    ])

    await httpRequest(body)
  }

  return (
    <div className="cardInfoContainer">
      <div className="row">
        <Icon />
        <h2>{title}</h2>
        <div className="buttons">
          <button onClick={(e) => editMode(e)}><span>{edit ? <SaveIcon /> : <EditIcon />}</span></button>
          <button hidden={edit ? false : true} onClick={rollbackBody}><span><CloseIcon /></span></button>
        </div>
      </div>
      <ul className="elements">
        {
          body ? body.map((element) => (
            <li key={Object.keys(element)}>
              <label htmlFor="">
                <span></span>
                <input type="text" 
                  value={Object.values(element)} 
                  onChange={e => change(e, element)} 
                  title={Object.keys(element)}
                  id={Object.keys(element)}
                  className={classNameField}
                  disabled={edit ? false : true}
                  />
              </label>
            </li>
          )): <Loading />
        }
      </ul>
    </div>
  )
}

export default CardInfo