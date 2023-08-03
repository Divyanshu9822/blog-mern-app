const mogoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mogoose.connect(process.env.MONGO_URI)
        console.log(`Mongoose Connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports  = connectDB