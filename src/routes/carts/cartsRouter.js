import { Router } from 'express'
import { getCart } from '../../controllers/carts/cartsController.js'
import { createCart } from '../../controllers/carts/newcartController.js'
import { addProductToCart } from '../../controllers/carts/cartproductController.js'
import { updateCart } from '../../controllers/carts/updatecartController.js'
import { updateProductCart } from '../../controllers/carts/updateproductController.js'
import { removeProductCart } from '../../controllers/carts/deleteproductcartController.js'
import { deleteProductsCart } from '../../controllers/carts/deletecartController.js'
import { authorizeUser } from '../../middlewares/authMiddleware.js'
import { cartPurchase } from '../../controllers/carts/cartPurchase.js'


const router = Router()


router.get ('/carts/:cid', getCart, async (req, res) => {

    res.render ('cart', { cart })
})


router.post ('/carts', createCart)


router.post ('/cart/:cid/product', authorizeUser, addProductToCart)


router.post ('cart/:cid/purchase', cartPurchase)


router.put ('/carts/:cid', updateCart)


router.put ('/carts/:cid/products/:pid', updateProductCart)


router.delete ('/carts/:cid/products/:pid', removeProductCart)


router.delete ('/carts/:cid', deleteProductsCart)


export default router
