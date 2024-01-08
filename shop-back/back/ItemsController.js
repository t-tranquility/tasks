import Items from "./Items.js";

class ItemsController {
    async create(req, res) {
        try {
            const { title, price, imageUrl } = req.body;
            const items = await Items.create({ title, price, imageUrl });
            res.json(items);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req,res){
        try{
            const items = await Items.find()
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
            const items = await Items.findById(id)
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
            const updatedItems = await Items.findByIdAndUpdate(items._id, items, {new: true})
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
                const items = await Items.findByIdAndDelete(id)  
                return res.json(items)        
            } catch(e){
                res.status(500).json(e);
            }
        }
    }

export default new ItemsController();
