import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import './style.css'
import InputSimple from '../inputSimple/inputSimple'
import AsideButton from '../asideButton/AsideButton'
import { useSelector } from 'react-redux'
import {consultCEP} from '../../utils/consultaCEP'
import authForm from '../../utils/authForm'
import { cepMask } from '../../utils/maskField' 

const FormRegister = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cep, setCep] = useState("")
    const [adress, setAdress] = useState("")
    const [district, setDistrict] = useState("")
    const [city, setCity] = useState("")
    const [complement, setComplement] = useState("")
    const [numberStreet, setNumberStreet] = useState("")
    const [body, setbody] = useState("")

    const { animationState, formStage } = useSelector(state => state.loginAnimation)
    const {httpRequest} = useFetch("/user/register", "POST")

    useEffect(() => {
        const findCEP = async () => {
            const replaceCEP = cep.replace(/-/g, '')
            const results = await consultCEP(replaceCEP)
            setAdress(results.logradouro)
            setDistrict(results.bairro)
            setCity(results.localidade)
        }
        cep.length > 8 && findCEP()
    },[cep]) 

    useEffect(() => {
        if(formStage === 1){
            setbody({name, phone, email, password})
        }else if(formStage === 2){
            setbody({cep, adress, district, city, complement, numberStreet})
        }else{
            setbody({name, phone, email, password, cep, complement, numberStreet})
        }
    }, [name, phone, email, password, cep, adress, district, city, complement, numberStreet, formStage])

    const createBody = () => {
        const authStage = authForm(body, formStage)
        return authStage
    }

    return (
        <div className='registerForm'>
            <h2 className={formStage === 1 ? "opacity":"block"}>Informações do Usuario</h2>
            <h2 className={formStage === 1 ? "block": formStage === 2 ? "opacity": formStage > 2 && "moveDown"}>Informações de localização</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                {
                    formStage === 1 ? 
                        <div className={animationState === 1 ? "formContainer dropDown":"formContainer moveDown"} id="form1">
                            <div className="row">
                                <InputSimple type="text" id="name" placeholder="Ex: Diogo Bianchini" title="Nome e Sobrenome" value={name} changeValue={setName} />
                                <InputSimple type="text" id="phone" placeholder="Ex: 15997516834" title="Telefone" value={phone} changeValue={setPhone} max={11} numberField={true} />
                            </div>
                            <div className="row">
                                <InputSimple type="text" id="email" placeholder="Ex: userName@mail.com" title="E-mail"  value={email} changeValue={setEmail} />
                                <InputSimple type="password" id="password" placeholder="Ex: ••••••" title="Senha" value={password} changeValue={setPassword} />
                            </div>
                        </div>:
                    formStage === 2 &&
                        <div className={animationState === 2 ? "formContainer dropDown":"moveDown"} id="form2">
                            <div className="row">
                                <InputSimple type="text" id="cep" placeholder="Ex: 00000-000" title="CEP" value={cep} changeValue={setCep} numberField={true} max={9} mask={cepMask}/>
                                <InputSimple type="text" id="adress" placeholder="Ex: Rua tira dentes" title="Endereço" value={adress} />
                            </div>
                            <div className="row">
                                <InputSimple type="text" id="district" placeholder="Ex: laranjeiras" title="Bairro" value={district} />
                                <InputSimple type="text" id="city" placeholder="Ex: Sorocaba" title="Cidade" value={city} />
                            </div>
                            <div className="row">
                                <InputSimple type="text" id="complement" placeholder="Ex: casa, casa 2, apto, fabrica..." title="Complemento" value={complement} changeValue={setComplement} />
                                <InputSimple type="text" id="numberStreet" placeholder="Ex: 25" title="Numero da residência" value={numberStreet} changeValue={setNumberStreet}  numberField={true}/>
                            </div>
                        </div> 
                }
            </form>
            <AsideButton action={createBody}/>
        </div>
    )
}

export default FormRegister