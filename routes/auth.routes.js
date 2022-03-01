const { Router } = require('express'),
        MyUser = require('../models/MyUsers');

const router = Router();

// /api/auth/register
router.get('/register', async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = new MyUser({email, password});

        await user.save();

        res.status(201).json({message: 'User was created'});

        console.log('Proceed your attempts...');

    } catch(err) {
        res.status(500).json({message: 'Ops, something wrong...'});
        console.log('App crashed...');
    }
});


module.exports = router;