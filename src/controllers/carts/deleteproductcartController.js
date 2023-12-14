import cartModel from '../../models/cart.model.js'


export const removeProductCart = async (req, res) => {

    const { cid, pid } = req.params

    try {

        const cart = await cartModel.findById (cid)

        if (!cart) {

            return res.status(404).json ({ error: 'Carrito no encontrado' })
        }

        const productIndex = cart.products.findIndex (item => item.product == pid)

        if (productIndex !== -1) {

            cart.products.splice (productIndex, 1)
            await cart.save()

            return res.status(200).json ({ message: 'Producto eliminado del carrito correctamente' })
            
        } else {

            return res.status(404).json ({ error: 'Producto no encontrado en el carrito' })
        }
    } catch (error) {

        console.error ('Error al eliminar el producto del carrito:', error)
        return res.status(500).json ({ error: 'Error interno del servidor' })
    }
}
