/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import SignupRouter from './SignUp.js'
import LoginFormRouter from './Login.js'
import dashboardRouter from './dashboard.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
// import { verifyToken } from './Middlewares/dashboardAuth.js';

const PORT = process.env.PORT|| 8000;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(cookieParser())

// Code body

// Handles SignUp Form from Sform.js
app.use('/', SignupRouter);

// Handles Login Form from Lform.js
app.use('/', LoginFormRouter);



//handles Dashboard data
app.use('/', dashboardRouter);

app.post('/refresh', (req, res)=>{
    const refreshToken = req.cookies.refreshToken;
// 'Please re-login'
    if (!refreshToken) return res.status(401).json({message : 'No refresh token provided'});

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
})

// verifyToken()
app.post('/logout', (req, res)=> {
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
    res.json({message: 'Logout successful'})
})



app.listen(8000, ()=>{
    console.log(`I am alive, runnning on port ${PORT}`)
})
