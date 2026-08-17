/* eslint-disable no-undef */
import express from 'express';
import {pool} from './db.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken'

const LoginFormRouter = express.Router();

LoginFormRouter.post('/Lform', async (req, res)=>{
    const {username, password} = req.body;
    try{
        const sqlQuery = `SELECT * FROM users where user_name = $1`
        const result = await pool.query(sqlQuery, [username] );
        const user = result.rows[0];

        if(result.rows.length === 0){
            return res.status(401).json({ message: "Username not found!" });
        }

        const validPassword = await argon2.verify(
            user.user_pword_hash,
            password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid username or password"
            })};

        const tokendata = {
            id: user.user_name,
        }

        const token = jwt.sign(tokendata, process
            .env.JWT_SECRET_TOKEN, {expiresIn:'30m'}
        )
       res.json({token: token})
    }catch(e){
    console.error("Login error:", e);
    res.status(500).json({
        message: "Something went wrong"
    });
}

})

export default LoginFormRouter