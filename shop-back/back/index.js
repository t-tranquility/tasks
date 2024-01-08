    import express from "express";
    import mongoose from "mongoose";
    import itemRouter from "./router.js";
    import cartRouter from "./cartRouter.js"
    import cors from "cors"

    const PORT = 5000
    const app = express()
    const DB_URL = `mongodb+srv://admin:admin008@cluster0.w9kzcvt.mongodb.net/?retryWrites=true&w=majority`

    app.use(cors());
    app.use(express.json())
    app.use(itemRouter)
    app.use(cartRouter)

    async function startApp(){
        try{
            await mongoose.connect(DB_URL)
            app.listen(PORT, ()=> console.log('server started on port ' + PORT))
        } catch(e){
            console.log(e)
        }
    }

    startApp()