import { useState } from "react"

const RegisterPage = () => {
    const [title, setTitle] = useState("")
    const [describe, setDescribe] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState([])
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState("")

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTZjYjYwYjIyZWMwMzcxMWFjMmZlMCIsImlhdCI6MTcxMjk1NTk2NCwiZXhwIjoxNzEyOTcwMzY0LCJzdWIiOiI2NjE2Y2I2MGIyMmVjMDM3MTFhYzJmZTAifQ.WWrYaeRB48oaPGM5j15JBqpCdyvQLWDFOZluGQILhZw"
    
    const handdleSubmit = async (e) => {
        e.preventDefault()

        const body = new FormData()
        body.set("title", title)
        body.set("describe", describe)
        body.set("price", price)
        body.set("category", category)
        body.set("stock", Number(stock))

        for(let files of image){
            body.append("imgURL", files)
        }

        const req = await fetch("http://localhost:8082/products", {
            method: "POST",
            headers: {token: token},
            body: body
        })

        const res = await req.json()

        console.log(res)
    }

    return (
    <main>
        <form onSubmit={handdleSubmit}>
            <label>
                <span>Titulo</span>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
            </label>
            <label>
                <span>Preço</span>
                <input type="text" value={price} onChange={e => setPrice(e.target.value)}/>
            </label>
            <label>
                <span>Descrição</span>
                <input type="text" value={describe} onChange={e => setDescribe(e.target.value)}/>
            </label>
            <label>
                <span>Categoria</span>
                <input type="text" value={category} onChange={e => setCategory(e.target.value)}/>
            </label>
            <label>
                <span>Image</span>
                <input type="file" multiple onChange={e => setImage([...e.target.files])}/>
            </label>
            <label>
                <span>Estoque</span>
                <input type="text" value={stock} onChange={e => setStock(e.target.value)}/>
            </label>
            <button className="agree-btn">Enviar</button>
        </form>
    </main>
    )
}

export default RegisterPage