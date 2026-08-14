/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import {pool, argon2Options} from './db.js'
import argon2 from 'argon2';
import signupRouter from './Sform.js';


const PORT = process.env.PORT|| 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello!!')
})

app.post('/Lform', async (req, res)=>{
    const {username, password} = req.body;

    try {
        const sqlQuery = `select * from users where user_name= $1`;
        await pool.query(sqlQuery, [username])
    } catch (error) {
        return
    }

    // res.json({ message: 'Done' });
})

app.use('/Sform', signupRouter)

app.listen(8000, ()=>{
    console.log(`I am alive, runnning on port ${PORT}`)
})