import express from 'express'
import Forum from '../Model/Forum.js';
import Team from '../Model/Team.js';
import mongoose from 'mongoose';

//router object
const router = express.Router()
const counterSchema = {
    id: {
        type: String
    },
    seq: {
        type: Number
    }
}
const counterModel = mongoose.model('counter', counterSchema);

router.get('/get/:id', async (req, resp) => {
    try {
        // console.log('triyng to fetch db for products')


        const products = await Team.find({ _id: req.params.id });
        if (products) {
            resp.send({
                success: true,
                teams: products
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

router.get('/get', async (req, resp) => {
    try {
        console.log('triyng to fetch db for products')
        const products = await Team.find();
        if (products) {
            resp.send({
                success: true,
                teams: products
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
        const { teamName, userid, username } = req.body;
        //validations

        if (!teamName) {
            return resp.send({ message: 'forum Name is required' })
        }

        if (!userid) {
            return resp.send({ message: 'userid is required' })
        }
        //check if existing users

        const user = await new Team({ teamName, userid, username }).save();
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

