/* eslint-disable no-undef */
import express from 'express';
import {pool} from './db.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken'

const LoginFormRouter = express.Router();

LoginFormRouter.post('/Login', async (req, res)=>{
    const {email, password} = req.body;
    try{
        const sqlQuery = `SELECT * FROM users where email = $1`
        const result = await pool.query(sqlQuery, [email] );
        const user = result.rows[0];

        if(result.rows.length === 0){
            return res.status(401).json({ message: "Invalid login credentials" });
        }

        const validPassword = await argon2.verify(
            user.user_pword_hash,
            password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid login credentials"
            })};

        const tokendata = {
            id: user.user_name,
            name: user.first_name,
            others:user.email
        }

        const accessToken = jwt.sign(tokendata, process.env.JWT_SECRET_TOKEN, {expiresIn:'15m'});
        const refreshToken = jwt.sign(tokendata, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
       
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
       
        res.json({message: 'Login Successful'})
    }catch(e){
    console.error("Login error:", e);
    res.status(500).json({
        message: "Something went wrong"
    });
}

})

export default LoginFormRouter
