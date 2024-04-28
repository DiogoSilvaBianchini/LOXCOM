export const formatPrice = (num) => {
    let valor = Number(num)
    let newPrice = valor.toLocaleString('pt-BR', 
    { style: 'currency', currency: 'BRL' })
    return newPrice
}