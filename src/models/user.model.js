import mongoose from 'mongoose'

const userSchema = new mongoose.Schema ({

  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  provider:String,
  role: {
    type: String,
    enum: ['admin', 'usuario'],
    default: 'usuario',
  }

}, { timestamps: true })

export default mongoose.model ('User', userSchema)
