const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { off } = require('../models/user.js');
const users   =require("../models/user.js");


// Import routes

//Router Middlewares
app.use(express.json());


//default value for limit is 5 and offset is 0
//This route should return an array of _id of all the element that need to be returned.
//output id can be in any order.

app.get("/",async function(req,res){

    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    try {
        const usersInRange = await users.find().limit(limit).skip(limit * offset);
        const ids = usersInRange.map(user => user._id);

        res.send(ids);
    } catch (error) {
        res.status(500).send("Error fetching data from the database");
    }
});

module.exports = app;


