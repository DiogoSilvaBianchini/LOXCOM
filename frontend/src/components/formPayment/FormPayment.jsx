import './style.css'
import { useEffect } from 'react'
import {formRender, requestToken} from '../../utils/payments'


    

// eslint-disable-next-line react/prop-types
const FormPayment = ({price, userId, productId}) => {
    
    useEffect(() => {
        formRender()
    }, [])

  return (
    <form id="form-checkout" onSubmit={(e) => requestToken(e, productId, userId)}>
        <div id="form-checkout__cardNumber" className="container"></div>
        <div id="form-checkout__expirationDate" className="container"></div>
        <div id="form-checkout__securityCode" className="container"></div>
        <input type="text" id="form-checkout__cardholderName" placeholder="Titular do cartão" />
        
        <select id="form-checkout__issuer" name="issuer">
            <option value="Banco emissor" disabled >Banco emissor</option>
        </select>
        <select id="form-checkout__installments" name="installments">
            <option value="Parcelas" disabled >Parcelas</option>
        </select>

        <select id="form-checkout__identificationType" name="identificationType">
            <option value="Tipo de documento" disabled >Tipo de documento</option>
        </select>

        <input type="text" id="form-checkout__identificationNumber" name="identificationNumber" placeholder="Número do documento" />
        <input type="email" id="form-checkout__email" name="email" placeholder="E-mail" />

        <input id="token" name="token" type="hidden" />
        <input id="paymentMethodId" name="paymentMethodId" type="hidden"/>
        <input id="transactionAmount" name="transactionAmount" type="hidden" value={price} />
        <input id="description" name="description" type="hidden" value="Nome do Produto" />

        <button type="submit" className='agree-btn' id="form-checkout__submit">Pagar</button>
    </form>
  )
}

export default FormPayment