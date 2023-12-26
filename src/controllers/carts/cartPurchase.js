import cartModel from '../../models/cart.model.js'
import ProductModel from '../../models/product.model.js'


export const cartPurchase = async (req, res) => {

    const { cid } = req.params

    try {
        const cart = await cartModel.findById(cid).populate ('items.product')

        if (!cart) {
            return res.status(404).json ({ error: 'Carrito no encontrado' })
        }

        
        for (const cartItem of cart.items) {

            const product = cartItem.product

            if (!product || product.stock < cartItem.quantity) {
                return res.status(400).json ({ error: 'No hay suficiente stock para uno o más productos.' })
            }

            product.stock -= cartItem.quantity
            await product.save()
        }

        
        const newTicket = new TicketModel ({ 
            purchase_datetime: new Date(),
            amount: cart.totalAmount,
            purchaser: req.session.user.email
        })

        await newTicket.save()

        return res.status(200).json ({ message: 'Compra realizada con éxito.' })

    } catch (error) {
        
        console.error ('Error al procesar la compra:', error)
        return res.status(500).json ({ error: 'Error interno del servidor' })
    }
}
