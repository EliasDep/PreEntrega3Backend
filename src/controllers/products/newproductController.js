import productsModel from '../../models/products.model.js'


export const createProduct = async (req, res) => {

    const { title, description, code, price, stock, category } = req.body
    const status = true
  
    if (!title || !description || !code || !price || !stock || !category) {

      return res.status(400).json ({ error: 'Todos los campos son obligatorios.' })
    }
  
    const newProduct = new productsModel({
        title,
        description,
        code,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
    })
  
    try {

        await newProduct.save()
        return res.status(200).json ({ success: 'Producto agregado con éxito.' })

    } catch (err) {

        console.error ('Error al agregar el producto:', err.message)
        return res.status(500).json ({ error: 'Error interno del servidor.' })
    }
}
