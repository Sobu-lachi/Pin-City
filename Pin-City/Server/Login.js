/* eslint-disable no-undef */
import express from 'express';
import {pool} from './db.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken'

const LoginFormRouter = express.Router();

LoginFormRouter.post('/api/login', async (req, res)=>{
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
            id: user.id
        }

        const accessToken = jwt.sign(tokendata, process.env.JWT_SECRET_TOKEN, {expiresIn:'15m'});
        const refreshToken = jwt.sign(tokendata, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
       
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await pool.query(
            `INSERT INTO refresh_tokens 
            (user_id, token, expires_at)
            VALUES ($1, $2, $3)`,
            [user.id, refreshToken, expiresAt]
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
       
        res.json({message: 'Login Successful'})
    }catch(e){
    res.status(500).json({
        message: `${e}: Something went wrong`
    });
}

})

export default LoginFormRouter
