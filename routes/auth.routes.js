const { Router } = require('express'),
        bcrypt = require('bcryptjs'),
        jwt = require('jsonwebtoken'),
        config = require('config'),
        { check, validationResult } = require('express-validator');
        MyUser = require('../models/MyUsers');

const router = Router();

// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Uncorretable email').isEmail(),
        check('password', 'Length of password must be more than  6 characters..')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in registration...'});
        }

        const {email, password} = req.body;
        const candidate = await MyUser.findOne({email});   

        if (candidate) {
            return res.status(400).json({message: 'The same user is already existing...'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new MyUser({email, password: hashedPassword});        

        await user.save();

        res.status(201).json({message: 'User was created'});

        console.log('Proceed your attempts...');

    } catch(err) {
        res.status(500).json({message: 'Ops, something wrong...'});
        console.log('App crashed...');
    }
});


// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'Please enter correct email').normalizeEmail().isEmail(),
        check('password', 'Please enter password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in login'});
        }

       const {email, password} = req.body;
       const user = await MyUser.findOne({email});

       if (!user) {
           return res.status(400).json({message: 'User was not find'});
       }

       const isMatch = await bcrypt.compare(password, user.password);

       if (!isMatch) {
           return res.status(400).json({message: 'Wrong password. Try again'});
       }

       const token = jwt.sign(
           { userId: user.id},
           config.get('jwtSecret'),
           {expiresIn: '1h'}
       );

       res.json({ token, userId: user.id });


    } catch(err) {
        res.status(500).json({message: 'Ops, something wrong...'});
        console.log('App crashed...');
    }
});

module.exports = router;