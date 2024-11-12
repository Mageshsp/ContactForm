const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Contact = require('./Contact');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Contact')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.post('/contact', async(req, res)=>{
    const {name, email, message} = req.body;
    try{
        const newContact =new Contact({name,email,message});
        await newContact.save();
        res.status(201).send("Contact saved successfully!");
    }
    catch(err){
        res.status(500).send("Error in saving contact");
    }
   
});
app.listen(5500,()=>{
    console.log("server run successfully");
})