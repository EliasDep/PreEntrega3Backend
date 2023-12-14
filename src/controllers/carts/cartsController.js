import cartModel from '../../models/cart.model.js'


export const getCart = async (req, res) => {
    
    const { cid } = req.params
    
    try {

        const cart = await cartModel.findById(cid).populate ('products.product', 'title price')

        if (cart) {

            return res.json (cart)

        } else {

            return res.status(404).json ({ error: 'Carrito no encontrado' })
        }
    } catch (error) {

        console.error ('Error al obtener el carrito:', error)
        return res.status(500).json ({ error: 'Error interno del servidor' })
    }
}
