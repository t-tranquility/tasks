import CartItem from "./CartItem.js"; 

class CartController {
    async create(req, res) {
        try {
            const { title, price, imageUrl } = req.body;
            const items = await CartItem.create({ title, price, imageUrl });
            res.json(items);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req,res){
        try{
            const items = await CartItem.find()
            return res.json(items)
        } catch(e){
            res.status(500).json(e);
        }
    }

    async getOne(req,res){
        try{
            const {id} = req.params
            if(!id){
                res.status(400).json({message: 'Id не указан'})
            }
            const items = await CartItem.findById(id)
            return res.json(items)
        } catch(e){
            res.status(500).json(e);
        }
    }

    async update(req,res){
        try{
            const items = req.body
            if(!items._id){
                res.status(400).json({message: 'Id не указан'})   
            }
            const updatedItems = await CartItem.findByIdAndUpdate(items._id, items, {new: true})
            return res.json(updatedItems)
        } catch(e){
            res.status(500).json(e);
        }
    }

    async delete(req,res){
        try{
            const {id} = req.params
            if(!id){
                res.status(400).json({message: 'Id не указан'})
            }  
            const items = await CartItem.findByIdAndDelete(id)  
            return res.json(items)        
        } catch(e){
            res.status(500).json(e);
        }
    }

    async clearCart(req, res) {
      try {
        console.log('Clearing the cart...');
        await CartItem.deleteMany({});
        res.json({ message: 'Cart cleared successfully' });
        console.log('Cart cleared successfully');
      } catch (error) {
        console.error('Error clearing the cart:', error);
        res.status(500).json(error);
      }
    }

    async increaseQuantity(req, res) {
      try {
        const { id } = req.params;
        const updatedItem = await CartItem.findByIdAndUpdate(
          id,
          { $inc: { quantity: 1 } },
          { new: true }
        );
        res.json(updatedItem);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    
    async decreaseQuantity(req, res) {
      try {
        const { id } = req.params;
        const existingItem = await CartItem.findById(id);
    
        if (!existingItem) {
          return res.status(404).json({ message: 'Item not found' });
        }
    

        const newQuantity = Math.max(existingItem.quantity - 1, 1);
    
        const updatedItem = await CartItem.findByIdAndUpdate(
          id,
          { quantity: newQuantity },
          { new: true }
        );
    
        res.json(updatedItem);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    
      async removeItem(req, res) {
        try {
          const { id } = req.params;
          const removedItem = await CartItem.findByIdAndRemove(id);
          res.json(removedItem);
        } catch (error) {
          res.status(500).json(error);
        }
      }
    }


export default new CartController();
