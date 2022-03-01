const express = require('express'),
      config = require('config'),
      mongoose = require('mongoose');

const PORT = config.get('port') || 5000;

const app = express();

app.use('/api/auth', require('./routes/auth.routes'));

async function start() {
    try {
        await mongoose.connect(config.get('MongoUri'));

        app.listen(PORT, () => {
            console.log(`Server has started on port ${PORT}`);
        })

    } catch(err) {
        console.log('Fuck off', err.message);
        process.exit(1);
    }
}
start();