var errors = []

const isEmpty = (body) => {
    const keys = Object.keys(body)
    const values = Object.values(body)
    
    values.forEach((valor, index) => {
        const id = keys[index]
        if(!valor){
            menagerErrors({id, message: `Campo ${id} está vazio.`})
        }else{
            removeErrorFromSystem({id, message: `Campo ${id} está vazio.`})
        }
    })
}

const specialCharacter = (body={}, blacklist=[]) => {
    const elements = {...body}
    
    blacklist.map(name => {
        delete elements[name]
    })

    const keys = Object.keys(elements)
    const values = Object.values(elements)
    
    const regex = /[^\w\s]/

    values.forEach((value, index) => {
        const id = keys[index]
        const isSpecialCharacter = regex.test(value)
        if(isSpecialCharacter){
            menagerErrors({id, message: "caracter inválido."})
        }
    })
}

const emailAuth = (email) => {
    if(!email.includes("@") || !email.includes(".")){
        menagerErrors({id: "email", message: "E-mail inválido."})
    }else{
        removeErrorFromSystem({id: "email", message: "E-mail inválido."})
    }
}

const passwordAuth = (password="") => {
    const spcialCaracter = /[^\w]/
    const letters = /[A-Z]/

    const isSpcialCaracter = spcialCaracter.test(password)
    const isLetters = letters.test(password)

    if(password.length < 8){
        menagerErrors({id: "password", message: "Utiliza no minimo 8 caracteres."})
    }else{
        removeErrorFromSystem({id: "password", message: "Utiliza no minimo 8 caracteres."})
    }
    
    if(!isSpcialCaracter){
        menagerErrors({id: "password", message: "Utiliza um deles: ! @ # $ %."})
    }else{
        removeErrorFromSystem({id: "password", message: "Utiliza um deles: ! @ # $ %."})
    }
    
    if(!isLetters){
        menagerErrors({id: "password", message: "Utiliza letras Maiúsculas."})
    }else{
        removeErrorFromSystem({id: "password", message: "Utiliza letras Maiúsculas."})
    }
}


const setError = (id, message) => {
    const field = document.querySelector(`#${id}`)
    field.classList.add("error")
    const label = field.parentElement
    const errorSpan = label.children[2]

    errorSpan.textContent = message
}

const nextError = (id) => {
    var results = {status: false , fieldErros: []} 
    const isErrorField = errors.filter(err => err.id === id)

    if(isErrorField.length > 0){
        results = {status: true, fieldErros: isErrorField}
    }

    return results
}

const toRemoveError = (id) => {
    const field = document.querySelector(`#${id}`)
    const label = field.parentElement
    const errorSpan = label.children[2]
    const isErrorField = nextError(id)
    if(isErrorField.status){
        errorSpan.textContent = isErrorField.fieldErros[0].message
    }else{
        field.classList.remove("error")
        errorSpan.textContent = ""
    }
    
}

const authName = (nameField) => {
    if(!nameField.includes(" ")){
        menagerErrors({id: "name", message: "Sobrenome pendente"})
    }else{
        removeErrorFromSystem({id: "name", message: "Sobrenome pendente"})
    }
}

const removeErrorFromSystem = (error) => {
    if(checkInputErros(error.id, error.message)){
        errors = errors.filter(err => err.message !== error.message)
        toRemoveError(error.id)
    }
}


const menagerErrors = (error) => {
    const newError = errors.filter(err => err.id === error.id && err.message === error.message)
    if(newError.length === 0){
        errors.push(error)
        setError(error.id, error.message)
    }
}


const checkInputErros = (id, errMessage) => {
    var results = false
    const fieldErro = errors.filter(err => err.id === id)
    
    if(fieldErro.length > 0){
        fieldErro.map(err => {
            if(err.message === errMessage){
                results = true
            }
        })
    }

    return results
}

const authForm = (body, formSateg) => {
    var results = true
    
    if(formSateg === 1){
        specialCharacter(body, ["email", "password"])
        emailAuth(body.email)
        passwordAuth(body.password)
        authName(body.name)
    }else{
        specialCharacter(body, ["city", "password", "cep"])
    }

    isEmpty(body)
    if(errors.length > 0){
        results = false
    }

    return results
}


export default authForm