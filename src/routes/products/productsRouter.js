import { Router } from 'express'
import { getProducts, getProductById, buildResponse} from '../../controllers/products/productsController.js'
import { updateProduct } from '../../controllers/products/updateproductController.js'
import { createProduct } from '../../controllers/products/newproductController.js'
import { deleteProduct } from '../../controllers/products/deleteproductController.js'
import { authorizeAdmin } from '../../middlewares/authMiddleware.js'


const router = Router()


router.get ('/products', getProducts, async (req, res) => {

    res.render ('products', buildResponse ({ ...result, query, sort }))
})


router.get ('/products/:pid', getProductById)


router.put ('/products/:pid', authorizeAdmin, updateProduct)


router.post ('/products', authorizeAdmin, createProduct)


router.delete ('/:pid', authorizeAdmin, deleteProduct)


export default router
