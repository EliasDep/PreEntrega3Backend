import cartModel from '../../models/cart.model.js'


export const addProductToCart = async (req, res) => {
    
    try {
        
        const { cid, pid } = req.params
        const { productId, quantity } = req.body

        const cart = await cartModel.findById (cid)

        if (!cart) {

            return res.status(404).json ({ error: 'Carrito no encontrado' })
        }

        const productToAdd = {

            product: productId,
            quantity: quantity
        }

        cart.products.push(productToAdd)
        await cart.save()

        res.status(200).json ({ message: 'Producto agregado al carrito correctamente' })
        
    } catch (error) {

        console.error ('Error al agregar el producto al carrito:', error)
        res.status(500).json ({ error: 'Error interno del servidor' })
    }
}
