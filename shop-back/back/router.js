import Router from "express";
import ItemsController from "./ItemsController.js";
const itemRouter = new Router()

itemRouter.post('/items', ItemsController.create)
itemRouter.get('/items', ItemsController.getAll)
itemRouter.get('/items/:id', ItemsController.getOne)
itemRouter.put('/items', ItemsController.update)
itemRouter.delete('/items/:id', ItemsController.delete)

export default itemRouter
