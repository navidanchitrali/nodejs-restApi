const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
    console.log('Mongo DB Connected .  . . ');
}).catch((err)=>{
    console.log('Error while creating Mongo DB Connection', err);
});