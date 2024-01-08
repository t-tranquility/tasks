import Router from "express";
import CartController from "./CartController.js";
const cartRouter = new Router()

cartRouter.post('/cart', CartController.create)
cartRouter.get('/cart', CartController.getAll)
cartRouter.get('/cart/:id', CartController.getOne)
cartRouter.put('/cart', CartController.update)
cartRouter.delete('/cart/:id', CartController.delete)
cartRouter.put('/cart/increase/:id', CartController.increaseQuantity);
cartRouter.put('/cart/decrease/:id', CartController.decreaseQuantity);
cartRouter.delete('/cart/:id/remove', CartController.removeItem);

export default cartRouter
