import cartModel from '../../models/cart.model.js'


export const createCart = async (req, res) => {
    
    const { products } = req.body
  
    if (!products) {

      return res.status(400).json ({ error: 'Todos los campos son obligatorios.' })
    }
  
    const newCart = new cartModel ({
        products
    })
  
    try {

        await newCart.save()
        return res.status(200).json ({ success: 'Carrito creado con éxito.' })

    } catch (err) {

        console.error ('Error al crear el carrito:', err.message)
        return res.status(500).json ({ error: 'Error interno del servidor.' })
    }
}
