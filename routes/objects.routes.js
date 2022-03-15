const { Router } = require('express');
const Flat = require('../models/MyFlats');

const router = Router();

// api/objects/record
router.post('/record', async (req, res) => {
    try {
        const {rooms, area, price, plan, description, renovation} = req.body;
        const flat = new Flat({rooms, area, price, plan, description, renovation});

        await flat.save();

        res.status(201).json({message: 'flat was added'});

    } catch(err) {
        res.status(500).json({message: 'Something went wrong...'});
    }
});

router.get('/', async (req, res) => {
    try {
        const flats = await Flat.find(req.params);
        res.json(flats);

    } catch(err) {
        res.status(500).json({message: 'Something went wrong...'});
    }
});

module.exports = router;