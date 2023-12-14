import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'


const cartItemSchema = new mongoose.Schema ({

    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }

}, { timestamps: true })

const cartSchema = new mongoose.Schema ({

    products: [cartItemSchema]

}, { timestamps: true })


cartSchema.plugin (mongoosePaginate)

export default mongoose.model ('cart', cartSchema)