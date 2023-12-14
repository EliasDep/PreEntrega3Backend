import cartModel from '../../models/cart.model.js'


export const updateCart = async (req, res) => {

    const { cid } = req.params
    const { products } = req.body

    try {

        const cart = await cartModel.findById (cid)

        if (!cart) {

            return res.status(404).json({ error: 'Carrito no encontrado' })
        }

        cart.products = products
        await cart.save()

        return res.status(200).json ({ message: 'Carrito actualizado correctamente' })

    } catch (error) {

        console.error ('Error al actualizar el carrito:', error)
        return res.status(500).json ({ error: 'Error interno del servidor' })
    }
}
