import express from 'express'
import {pool, argon2Options} from './db.js';
import argon2 from 'argon2';

const signUpForm = express.Router()

signUpForm.post('/', async (req, res)=>{
    const {fName, lName, email, userName, password} = req.body;

    try {
        

        const hashedpassword = await argon2.hash(password, argon2Options)
        const sqlQuery = `
            INSERT INTO users (first_name, last_name, email, user_name, user_pword_hash)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [fName, lName, email, userName, hashedpassword];
console.log("ENTERED PASSWORD:", password);


        const result = await pool.query(sqlQuery, values);
        
        res.status(200);
        res.json();

        // res.json({message: "Login successful!",
        //     token: token});

    } catch (error) {
        console.error('Database Error:', error);

        if (error.code === '23505') {
            return res.status(400).json({ message: 'Email or Username already taken.' });
        }
        
        res.status(500).json({ message: 'Internal server database error.' });
    }

    // res.json({message:'Done'});
})


export default signUpForm