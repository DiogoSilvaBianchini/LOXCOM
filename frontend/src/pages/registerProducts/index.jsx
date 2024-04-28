import './style.css'
import { useEffect, useState } from "react"
import { useAppContext } from '../../hooks/useAppContext'
import Header from "../../components/header/header"
import { ShoppingCartOutlined } from '@mui/icons-material'
import BackupIcon from '@mui/icons-material/Backup';
import { common } from '@mui/material/colors'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom'



const RegisterPage = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("0")
    const [describe, setDescribe] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState("")

    const [hiddenInput, setHiddenInput] = useState([0,0])
    const [actualImage, setActualImage] = useState("")
    const [tempImg, setTempImg] = useState([])
    const [error, setError] = useState(null)
    const [form, setForm] = useState(0)

    const {cookie} = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        if(tempImg.length >= 0){
            setActualImage(tempImg[0])
        }

        if(tempImg.length === 0 && form === 0){
            document.getElementById("imgCard").value = ""
        }

        if(tempImg.length <= 5){
            setError(null)
        }
    },[tempImg, form])


    const removeImage = (e, imgName) => {
        e.preventDefault()
        let arr = []
        fetch("http://localhost:8082/products/removeImg", {
            headers: {"Content-Type":"application/json", token: cookie.token},
            method: "DELETE",
            body: JSON.stringify({imgs: imgName})
        })

        for(let img of tempImg){
            if(img !== imgName){
                arr.push(img)
            }
        }
        setTempImg([...arr])
    }

    const formatPrice = (num) => {
        var formatValor;
        if(num.includes(",")){
            num = num.replace(",", ".")
        }
        
        let valor = Number(num)
        if(!valor && valor != 0 || valor < 0){
            formatValor = "Valor invalido"
        }else{
            formatValor = valor.toLocaleString('pt-BR', {
                style: "currency",
                currency: 'BRL'
            })
        }
        

        return formatValor
    }

    const uploadTempImag = async (img) => {
        const body = new FormData()

        for(let files of img){
            body.append("imgs", files)
        }

        if(tempImg.length < 5){
            const req = await fetch("http://localhost:8082/products/saveImg", {
                method: "POST",
                headers: {token: cookie.token},
                body
            })

            const res = await req.json()
            console.log(res)
            if(res.status === 401){
                navigate("/login")
            }else{
                setTempImg([...tempImg, ...res.message])
                setActualImage(res.message[0])
            }
        }else{
            setError("Podem no maximo 5 imagens no formulário!")
        }

    } 

    const focusInputLabel = () => {
        if(tempImg && tempImg.length == 0){
            document.getElementById("textLabel").style.color = "#0084ff"
        }
    }
    const disableFocusInputLabel = () => {
        if(tempImg && tempImg.length == 0){
            document.getElementById("textLabel").style.color = "#c4c4c4"
        }
    }

    const setImageCard = (e) => {
        setActualImage(e)
    }

    const handdleSubmite = async () => {
        const body = {
            title, price, describe, category, stock, imgs: tempImg
        }

        const requisition = await fetch("http://localhost:8082/products/", {
            headers: {"Content-Type":"application/json", token: cookie.token},
            method: "POST",
            body: JSON.stringify(body)
        })
        
        const response = await requisition.json()
        console.log(response)
    }
    return (
    <>
        <Header />
        <div className="containerRegister">
           {error && <span className='error-text'>*{error}</span>}
            <div className="containerForm" id='container' onClick={(e) => {e.target.id === "container" && setHiddenInput([0,0])}}>
                <div className="trocaImgs">
                    {tempImg && tempImg.map(e => (
                        <button hidden={form === 0 ? false : true} className={`cancel-select ${error ? "error":""}`} onClick={() => {setImageCard(e)}} key={e}>
                            <img src={`./productsImages/${e}`} alt="Protipo da foto do produto" />
                        </button>
                    ))}
                    {
                        tempImg.length > 0 && form === 0 && 
                        <label htmlFor="agreeImages" className='iconBtn'>
                            <ControlPointIcon />
                            <input type="file" multiple hidden onChange={e => uploadTempImag(e.target.files)} name="agreeImages" id="agreeImages" />
                        </label>
                    }
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    {form === 0 ? 
                    <>
                        <label id='labelInputFile' htmlFor="imgCard" className={`labelImage ${error && "errorLabel"}`}>
                            {tempImg.length == 0 ? 
                                <span id='textLabel' onMouseEnter={focusInputLabel} onMouseLeave={disableFocusInputLabel} className='contPictores'><BackupIcon /> {tempImg.length} fotos selecionadas</span>
                                :
                                <img className='cancel-select' id='imgPrototype' src={`./productsImages/${actualImage}`} onClick={(e) => removeImage(e, actualImage)}/>
                            }
                            
                            <input type="file" multiple onChange={e => uploadTempImag(e.target.files)} id='imgCard' name='imgCard' hidden/>
                        </label>
                        <label>
                            <span hidden={hiddenInput[0] === 0 ? false : true} onClick={() => setHiddenInput([1,0])} >{title.length === 0 ? "Nome do produto": title}</span>
                            <input type="text" id='title' placeholder='Titulo do produto' className='inputCard'  hidden={hiddenInput[0] === 1 ? false : true} onBlur={() => setHiddenInput([0,0])} onDoubleClick={() => {setHiddenInput([0,0])}} onChange={e => setTitle(e.target.value)} value={title} />
                        </label>
                        <label>
                            <span hidden={hiddenInput[1] === 0 ? false : true} onClick={() => setHiddenInput([0,1])} >{formatPrice(price)}</span>
                            <input type="text" id='price' className='inputCard' placeholder='Preço do produto' onBlur={() => setHiddenInput([0,0])} hidden={hiddenInput[1] === 1 ? false : true} onDoubleClick={() => {setHiddenInput([0,0])}}  onChange={e => {setPrice(e.target.value)}} value={price} />
                        </label>
                        <button type='button' className='agree-btn' onClick={() => setForm(1)}><ShoppingCartOutlined sx={{ color: common.white }}/>Proximo</button>
                    </>:
                    <> 
                        <label htmlFor="describes">
                            <span>descrição</span>
                            <textarea type='text' className='largeInput' name="describes" id="describes" value={describe} onChange={(e) => setDescribe(e.target.value)}/>
                        </label>
                        <label htmlFor="category">
                            <span>Categoria</span>
                            <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} value={category}>
                                <option value="eletronicos">Eletronicos</option>
                                <option value="moveis">Moveis</option>
                                <option value="gamer">Gamer</option>
                            </select>
                        </label>
                        <label htmlFor="stock">
                            <span>Estoque</span>
                            <input type="text" name="stock" onChange={(e) => setStock(e.target.value)} value={stock}/>
                        </label>
                        <div className="rowButtons">
                            <button className='icon-btn' onClick={() => setForm(0)}><KeyboardBackspaceIcon /></button>
                            <button className='icon-btn' onClick={() => handdleSubmite()}><ShoppingCartOutlined /></button>
                        </div>
                    </>
                    } 
                </form>
            </div>
        </div>
        
    </>
    )
}

export default RegisterPage