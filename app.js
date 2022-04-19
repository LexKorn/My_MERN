require('colors');

const express = require('express'),
      config = require('config'),
      mongoose = require('mongoose'),
      cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({extended: true}));    // чтобы парсить в json

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/objects', require('./routes/objects.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('MongoUri'));

        app.listen(PORT, () => {
            console.log(`Server has started on port ${PORT}`.bgCyan);
        })

    } catch(err) {
        console.log('Fuck off', err.message);
        process.exit(1);
    }
}
start();