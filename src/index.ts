import 'dotenv/config';
import express from 'express';
import type Response = require('express');
import type Request = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send("Hello, World!");
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
