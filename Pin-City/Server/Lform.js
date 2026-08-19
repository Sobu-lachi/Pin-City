/* eslint-disable no-undef */
import express from 'express';
import {pool} from './db.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken'

const LoginFormRouter = express.Router();

LoginFormRouter.post('/Lform', async (req, res)=>{
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
        }

        const accessToken = jwt.sign(tokendata, process.env.JWT_SECRET_TOKEN, {expiresIn:'30s'});
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



 
        // 2. Calculate the token's expiration date for the database (7 days from now)
        // const expiresAt = new Date();
        // expiresAt.setDate(expiresAt.getDate() + 7);

        // Optional: Grab device info from request headers to show the user later
        // const deviceInfo = req.headers['user-agent'] || 'Unknown Device';

        // 3. SQL Insert: Save this active session token to the tracking table
        // const sessionQuery = `
        //     INSERT INTO refresh_tokens (user_id, user_token, device_info, expires_at)
        //     VALUES ($1, $2, $3, $4);
        // `;
        // await pool.query(sessionQuery, [user.id, refreshToken, deviceInfo, expiresAt]);