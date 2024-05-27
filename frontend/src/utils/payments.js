import { loadMercadoPago } from "@mercadopago/sdk-js";

await loadMercadoPago()
const mp = new window.MercadoPago("APP_USR-23ae56cb-a9c6-41c9-b39b-3dbf5576323c")

const formRender = async () => {
    if(document.getElementById("form-checkout__cardNumber").children.length < 1){
        const cardNumberElement = mp.fields.create('cardNumber', {
            placeholder: "Número do cartão"
        }).mount('form-checkout__cardNumber');
        
        mp.fields.create('expirationDate', {
            placeholder: "MM/YY",
        }).mount('form-checkout__expirationDate');
        
        const securityCodeElement = mp.fields.create('securityCode', {
            placeholder: "Código de segurança"
        }).mount('form-checkout__securityCode');
        
        renderCard(cardNumberElement, securityCodeElement)
        getIdentificationTypes()
    }
}


const createSelectOptions = (elem, options, labelsAndKeys = { label: "name", value: "id" }) => {
    const { label, value } = labelsAndKeys;

    elem.options.length = 0;

    const tempOptions = document.createDocumentFragment();

    options.forEach(option => {
      const optValue = option[value];
      const optLabel = option[label];

      const opt = document.createElement('option');
      opt.value = optValue;
      opt.textContent = optLabel;

      tempOptions.appendChild(opt);
    });

    elem.appendChild(tempOptions);
}

const getIdentificationTypes = async () => {
    try {
      const identificationTypes = await mp.getIdentificationTypes();
      const identificationTypeElement = document.getElementById('form-checkout__identificationType');

      createSelectOptions(identificationTypeElement, identificationTypes);
    } catch (e) {
      return console.error('Error getting identificationTypes: ', e);
    }
}

const renderCard = (cardNumberElement, securityCodeElement) => {

    const paymentMethodElement = document.getElementById('paymentMethodId');
    const issuerElement = document.getElementById('form-checkout__issuer');
    const installmentsElement = document.getElementById('form-checkout__installments');

    const issuerPlaceholder = "Banco emissor";
    const installmentsPlaceholder = "Parcelas";

    let currentBin;
    cardNumberElement.on('binChange', async (data) => {
      const { bin } = data;
      try {
        if (!bin && paymentMethodElement.value) {
          clearSelectsAndSetPlaceholders();
          paymentMethodElement.value = "";
        }

        if (bin && bin !== currentBin) {
          const { results } = await mp.getPaymentMethods({ bin });
          const paymentMethod = results[0];

          paymentMethodElement.value = paymentMethod.id;
          updatePCIFieldsSettings(paymentMethod);
          updateIssuer(paymentMethod, bin);
          updateInstallments(paymentMethod, bin);
        }

        currentBin = bin;
      } catch (e) {
        console.error('error getting payment methods: ', e)
      }
    });

    const clearSelectsAndSetPlaceholders = () => {
      clearHTMLSelectChildrenFrom(issuerElement);
      createSelectElementPlaceholder(issuerElement, issuerPlaceholder);

      clearHTMLSelectChildrenFrom(installmentsElement);
      createSelectElementPlaceholder(installmentsElement, installmentsPlaceholder);
    }

    const clearHTMLSelectChildrenFrom = (element) => {
      const currOptions = [...element.children];
      currOptions.forEach(child => child.remove());
    }

    const createSelectElementPlaceholder = (element, placeholder) => {
      const optionElement = document.createElement('option');
      optionElement.textContent = placeholder;
      optionElement.setAttribute('selected', "");
      optionElement.setAttribute('disabled', "");

      element.appendChild(optionElement);
    }


    const updatePCIFieldsSettings = (paymentMethod) => {
      const { settings } = paymentMethod;

      const cardNumberSettings = settings[0].card_number;
      cardNumberElement.update({
        settings: cardNumberSettings
      });

      const securityCodeSettings = settings[0].security_code;
      securityCodeElement.update({
        settings: securityCodeSettings
      });
    }

    const updateIssuer = async (paymentMethod, bin) => {
        const { additional_info_needed, issuer } = paymentMethod;
        let issuerOptions = [issuer];

        if (additional_info_needed.includes('issuer_id')) {
            issuerOptions = await getIssuers(paymentMethod, bin);
        }

        createSelectOptions(issuerElement, issuerOptions);
    }
  
    const getIssuers = async (paymentMethod, bin) => {
        try {
            const { id: paymentMethodId } = paymentMethod;
            return await mp.getIssuers({ paymentMethodId, bin });
        } catch (e) {
            console.error('error getting issuers: ', e)
        }
    }

    const updateInstallments = async (paymentMethod, bin) => {
        try {
            const installments = await mp.getInstallments({
            amount: document.getElementById('transactionAmount').value,
            bin,
            paymentTypeId: 'credit_card'
            });
            const installmentOptions = installments[0].payer_costs;
            const installmentOptionsKeys = { label: 'recommended_message', value: 'installments' };
            createSelectOptions(installmentsElement, installmentOptions, installmentOptionsKeys);
        } catch (e) {
            console.error('error getting installments: ', e)
        }
    }
}

const createCardToken = async () => {
  try {
    const token = await mp.fields.createCardToken({
      cardholderName: document.getElementById('form-checkout__cardholderName').value,
      identificationType: document.getElementById('form-checkout__identificationType').value,
      identificationNumber: document.getElementById('form-checkout__identificationNumber').value,
    });
    return token.id
  } catch (e) {
    console.error('error creating card token: ', e)
    return false
  }
}

const requestToken = async (event, productId, userToken) => {
  event.preventDefault()
  const token = await createCardToken()

  if(!token){
    location.reload()
    return false
  } 

  const body = {
    products: [{"id": productId, "quantity": 1}], 
    installments: document.getElementById("form-checkout__installments").value,
    docType: document.getElementById("form-checkout__identificationType").value,
    docNumber: document.getElementById("form-checkout__identificationNumber").value, 
    tokenCard: token
  }

  const req = await fetch(`${process.env.SERVER_URL}/user/payment`, {
    headers: {"Content-Type":"application/json", token: userToken},
    method: "POST",
    body: JSON.stringify(body)
  })

  const res = await req.json()
  console.log(res)
}

export {
    formRender,
    createCardToken,
    requestToken
}