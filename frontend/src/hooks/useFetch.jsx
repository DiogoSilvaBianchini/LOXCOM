const useFetch = async (url) => {
    const urlBody = await fetch(url)
    const res = await urlBody.json()
    return {res}
}

export default useFetch