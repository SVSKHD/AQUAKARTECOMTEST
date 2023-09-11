import {createRouter} from "next-connect"
import db from '../../utils/db'
import AquaCategory from '@/Backend/models/category';

const Router = createRouter()

Router.post(async (req, res) => {
    const body = req.body
    try {
        db.connectDb()
        const category = AquaCategory(body)
        await category.save()
        res.status(200).json(category)
        db.disconnectDb()
    } catch (error) {
       res.status(400).json(error)        
    }
});


Router.get(async (req, res) => {
    try {
        db.connectDb()
        const categories = await AquaCategory.find({});
        res.status(200).json(categories);
        db.disconnectDb()
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});




export default Router.handler()

