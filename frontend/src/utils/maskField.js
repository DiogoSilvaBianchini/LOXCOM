const cepMask = (value="", setValue) => {
    if(value.length === 5){
        let newValue = value + "-"
        setValue(newValue)
    }
} 

export {
    cepMask
}