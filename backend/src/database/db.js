import mongoose from 'mongoose'

const dbConn = () => {
    try {
        // eslint-disable-next-line no-undef
        mongoose.connect(process.env.DB_URL)
        return mongoose.connection
    } catch (error) {
        console.error(error)
    }
}

export default dbConn