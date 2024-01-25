import express from 'express'
import Forum from '../Model/Forum.js';

//router object
const router = express.Router()

router.get('/get', async (req, resp) => {
    try {
        console.log('triyng to fetch db for products')
        const products = await Forum.find();
        if (products) {
            resp.send({
                success: true,
                forums: products
            })
        } else {
            resp.send({
                success: false,
                message: 'Unable to find forums'
            })
        }
    } catch (e) {
        resp.status(500).send({
            message: 'Error in fetching products',
            success: false
        })
    }
})

//register || METHOD POST
router.post('/new', async (req, resp) => {
    console.log(req.body)
    try {
        //get req body
        const { fname, userid, username } = req.body;
        //validations

        if (!fname) {
            return resp.send({ message: 'forum Name is required' })
        }

        if (!userid) {
            return resp.send({ message: 'userid is required' })
        }
        //check if existing users

        const user = await new Forum({ fname, userid, username }).save();
        resp.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        })

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Registeration",
            error
        })
    }
});

export default router;

