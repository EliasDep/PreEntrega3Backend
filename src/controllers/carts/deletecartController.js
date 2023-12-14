import cartModel from '../../models/cart.model.js'


export const deleteProductsCart = async (req, res) => {

    const { cid } = req.params

    try {

        const cart = await cartModel.findById (cid)

        if (!cart) {

            return res.status(404).json ({ error: 'Carrito no encontrado' })
        }

        cart.products = []
        await cart.save()

        return res.status(200).json ({ message: 'Todos los productos del carrito fueron eliminados correctamente' })
        
    } catch (error) {

        console.error ('Error al eliminar todos los productos del carrito:', error)
        return res.status(500).json ({ error: 'Error interno del servidor' })
    }
}