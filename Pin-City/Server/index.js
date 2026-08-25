/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import SignupRouter from './SignUp.js'
import LoginFormRouter from './Login.js'
import dashboardRouter from './dashboard.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import pinRouter from './pin.js';
import { pool } from './db.js';
// import { verifyToken } from './Middlewares/dashboardAuth.js';

const PORT = process.env.PORT|| 8000;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(cookieParser())

// const pin = crypto.randomInt(100000, 1000000);
// console.log(pin)

// Code body

// Handles SignUp Form from Sform.js
app.use('/', SignupRouter);

// Handles Login Form from Lform.js
app.use('/', LoginFormRouter);



//handles Dashboard data
app.use('/', dashboardRouter);

app.post('/refresh', async (req, res)=>{
    const refreshToken = req.cookies.refreshToken;
// 'Please re-login'
    if (!refreshToken) return res.status(401).json({message : 'No refresh token provided'});
    try {

        const result = await pool.query(
            `SELECT * FROM refresh_tokens
             WHERE token = $1`,
            [refreshToken]
        );

        if (result.rows.length === 0) {
            return res.status(403).json({
                message: 'Refresh token has been revoked'
            });
        }

     jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decodedPayload) => {
        if (err) return res.status(401).json({ message: "Refresh token is invalid or expired. Please re-login." });
        
        const newAccessToken = jwt.sign(
            { id: decodedPayload.id, }, 
            process.env.JWT_SECRET_TOKEN, 
            { expiresIn: '15m' } //15m
        );

         res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });

        res.json({
            message: "Access token refreshed"
        });
    });
}catch(e){
     console.error(e);

        res.status(500).json({
            message: 'Server error while refreshing token'
        });
}})
app.use('/', pinRouter)

// verifyToken()
app.post('/logout', async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    try {

        if (refreshToken) {
            await pool.query(
                `DELETE FROM refresh_tokens
                 WHERE token = $1`,
                [refreshToken]
            );
        }

        res.clearCookie('accessToken',{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        });
    res.clearCookie('refreshToken',{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        });

        res.json({
            message: 'Logout successful'
        });

    } catch (error) {

        console.error('Logout error:', error);

        res.status(500).json({
            message: 'Logout failed'
        });
    }
});


app.listen(8000, ()=>{
    console.log(`I am alive, runnning on port ${PORT}`)
})
