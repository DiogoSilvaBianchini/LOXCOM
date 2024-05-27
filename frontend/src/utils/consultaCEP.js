export const consultCEP = async (cep) => {
    try {
        const req = await fetch(`http://viacep.com.br/ws/${cep}/json/`)
    
        const results = await req.json()
        return results
    } catch (error) {
        console.log(error)
    }
}