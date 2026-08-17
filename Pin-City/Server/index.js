/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import SignupRouter from './Sform.js'
import LoginFormRouter from './Lform.js'
import dashboardRouter from './dashboard.js'

const PORT = process.env.PORT|| 8000;
const app = express();
app.use(cors());
app.use(express.json());

// Code body

// Handles SignUp Form from Sform.js
app.use('/', SignupRouter);

// Handles Login Form from Lform.js
app.use('/', LoginFormRouter);

//handles Dashboard data
app.use('/', dashboardRouter);







app.listen(8000, ()=>{
    console.log(`I am alive, runnning on port ${PORT}`)
})
