import cartModel from '../../models/cart.model.js'


export const updateProductCart = async (req, res) => {

    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
    
        const cart = await cartModel.findById (cid)

        if (!cart) {

            return res.status(404).json ({ error: 'Carrito no encontrado' })
        }

        const cartProduct = cart.products.find (item => item.product == pid)

        if (cartProduct) {

            cartProduct.quantity = quantity
            await cart.save()

            return res.status(200).json ({ message: 'Cantidad de producto en el carrito actualizada correctamente' })
        } else {

            return res.status(404).json ({ error: 'Producto no encontrado en el carrito' })
        }
    } catch (error) {

        console.error ('Error al actualizar la cantidad del producto en el carrito:', error)
        return res.status(500).json ({ error: 'Error interno del servidor' })
    }
}