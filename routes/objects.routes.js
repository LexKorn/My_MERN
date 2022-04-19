const { Router } = require('express');
const Flat = require('../models/MyFlats');

const router = Router();

// api/objects/create
router.post('/create', async (req, res) => {
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

        // await Flat.find(req.params)
        //     .sort(-req.params.date)
        //     .then((flats) => res.status(200).json(flats));

    } catch(err) {
        res.status(500).json({message: 'Something went wrong...'});
    }
});


// api/objects/flat-update
router.put('/flat-update', async (req, res) => {
    await Flat.findByIdAndUpdate(
        { _id: req.body.flatId },
        { $set: {...req.body} },
        { new: true }, 

        (err, results) => {
            if (err) {
                return res.status(422).json({message: 'Нет такой квартиры'});
            }

            return res.status(200).json(results);
        }
    )
});


// get flat by id
router.get('/flat/:id', async (req, res) => {
    console.log(req.params.id);

    const flat = await Flat.findOne({ _id: req.params.id });

    if (!flat) {
        return res.status(422).json({message: 'Нет такой квартиры'});
    }

    res.status(200).json(flat);
})


// delete flat
router.delete('/flat-delete/:id', async (req, res) => {
	console.log('id', req.params.id);
	try {
		await Flat.findOne({ _id: req.params.id }).exec((err, result) => {
			if (err) {
                return res.status(422).json({ message: `Нет такой квартиры ${id}` });
            }

			result
				.remove()
				.then(() => res.status(200).json({ message: 'Success' }))
				.catch((err) => console.error(err));
		});
        
	} catch (e) {
		console.error(e);
	}
});


module.exports = router;