import express from 'express'
import Team from '../Model/Team.js';
import Work from '../Model/Work.js';

//router object
const router = express.Router()

router.get('/get/:id', async (req, resp) => {
    try {
        // console.log('triyng to fetch db for products')


        const products = await Work.find({ team: req.params.id });
        if (products) {
            resp.send({
                success: true,
                works: products
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

// router.get('/get', async (req, resp) => {
//     try {
//         console.log('triyng to fetch db for products')
//         const products = await Team.find();
//         if (products) {
//             resp.send({
//                 success: true,
//                 teams: products
//             })
//         } else {
//             resp.send({
//                 success: false,
//                 message: 'Unable to find forums'
//             })
//         }
//     } catch (e) {
//         resp.status(500).send({
//             message: 'Error in fetching products',
//             success: false
//         })
//     }
// })

//register || METHOD POST
router.post('/new', async (req, resp) => {
    console.log(req.body)
    try {
        //get req body
        const { team, url, username, filename } = req.body;
        //validations

        if (!url) {
            return resp.send({ message: 'Url is required' })
        }

        if (!team) {
            return resp.send({ message: 'team id is required' })
        }



        const user = await new Work({ team, fileName: filename, url, username }).save();
        resp.status(201).send({
            success: true,
            message: 'User registered successfully',
            work: user
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

