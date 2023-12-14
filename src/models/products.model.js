import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'


const productsSchema = new mongoose.Schema ({

    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    code: { type: Number, required: true, unique: true },
    stock: { type: Number, required: true }

}, { timestamps: true })


productsSchema.plugin (mongoosePaginate)

export default mongoose.model ('products', productsSchema)