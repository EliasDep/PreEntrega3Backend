import Cart from '../models/cart.model.js'


const CartDAO = {

  async createCart (products) {

    try {

      const newCart = new Cart ({ products })
      return await newCart.save()

    } catch (error) {

      throw new Error (`Error creating cart: ${error}`)
    }
  },


  async getCartById (cartId) {

    try {

      return await Cart.findById (cartId)

    } catch (error) {

      throw new Error (`Error fetching cart: ${error}`)
    }
  },


  async updateCart (cartId, updatedProducts) {

    try {

      return await Cart.findByIdAndUpdate(

        cartId,
        { products: updatedProducts },
        { new: true }
      )

    } catch (error) {

      throw new Error (`Error updating cart: ${error}`);
    }
  },


  async deleteCart(cartId) {

    try {

      return await Cart.findByIdAndDelete (cartId)

    } catch (error) {

      throw new Error (`Error deleting cart: ${error}`);
    }
  },
}

export default CartDAO
