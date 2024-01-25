import express from 'express'
import User from '../Model/User.js';

//router object
const router = express.Router()

const CHAT_ENGINE_PROJECT_ID = "bd1f1f27-a91a-4da0-8768-8ff427381ab7";
const CHAT_ENGINE_PRIVATE_KEY = "fff6f5d4-b9a3-440c-87a7-2272c7caca7d";
//register || METHOD POST

router.post('/showchat', async (req, res) => {
    try {
        const { email, password } = req.body;
        const r = await axios.get("https://api.chatengine.io/users/me/", {
            headers: {
                "Project-ID": CHAT_ENGINE_PROJECT_ID,
                "User-Name": email,
                "User-Secret": password,
            },
        });
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
    }
})

router.post('/login', async (req, res) => {
    // axios
    // .post("http://localhost:3001/login", { username, secret })
    // .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
    // .catch((e) => console.log(JSON.stringify(e.response.data)));

    const { email, password } = req.body;
    //validations

    console.log(email)
    if (!email && !password) {
        return res.send({ message: 'Email ,googleid and name is required' })
    }
    //check if existing users

    const user = await User.find({ email });
    console.log(user)
    try {
        return res.send(
            {
                success: true,
                user
            }
        );
    } catch (e) {
        return res.send({
            success: false
        })
    }


    // const user = await new User({ email,  googleid }).save();

})


router.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        //get req body
        const { name, email, password } = req.body;
        //validations

        if (!email && !password) {
            return res.send({ message: 'Email ,googleid and name is required' })
        }
        //check if existing users
        const Ex_user = await User.findOne({ email });
        if (Ex_user) {
            res.send({
                user: Ex_user
            })
        }
        const user = await new User({ email, name, password }).save();
        try {
            return res.send({
                success: true,
                user
            });
        } catch (e) {
            return res.status(e.response.status).json(e.response.data);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error
        })
    }
});

export default router;

