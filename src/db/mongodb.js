import mongoose from 'mongoose'
import config from '../config.js'

const URI = config.db.mongodbUri

export const init = async () => {

    try {

        await mongoose.connect (URI)
        console.log ('Database Connected ')
        
    } catch (error) {
        console.log ('Error to connect to database', error.message)
    }
}
