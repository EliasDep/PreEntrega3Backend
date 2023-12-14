import Product from '../models/products.model.js'


const ProductDAO = {

  async createProduct (title, description, price, code, stock) {

    try {

      const newProduct = new Product ({ title, description, price, code, stock })
      return await newProduct.save()

    } catch (error) {

      throw new Error (`Error creating product: ${error}`)
    }
  },


  async getProductById (productId) {

    try {

      return await Product.findById (productId)

    } catch (error) {

      throw new Error (`Error fetching product: ${error}`)
    }
  },


  async updateProduct (productId, updatedData) {

    try {

      return await Product.findByIdAndUpdate (productId, updatedData, { new: true })

    } catch (error) {

      throw new Error (`Error updating product: ${error}`)
    }
  },


  async deleteProduct (productId) {

    try {

      return await Product.findByIdAndDelete (productId)

    } catch (error) {

      throw new Error (`Error deleting product: ${error}`)
    }
  },
}

export default ProductDAO
