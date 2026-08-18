/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import SignupRouter from './Sform.js'
import LoginFormRouter from './Lform.js'
import dashboardRouter from './dashboard.js';

const PORT = process.env.PORT|| 8000;
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

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
        if (err) return res.status(403).json({ message: "Refresh token is invalid or expired. Please re-login." });

        const newAccessToken = jwt.sign(
            { userId: decodedPayload.userId }, 
            process.env.JWT_SECRET_TOKEN, 
            { expiresIn: '15m' }
        );

        res.json({ accessToken: newAccessToken });
    });
})

authRouter.post('/refresh', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "No session found." });

    try {
        // 1. SQL Search: Look for this exact token inside the database
        const dbResult = await pool.query('SELECT * FROM user_sessions WHERE token = $1', [refreshToken]);
        
        // If it isn't in the database, someone deleted the session (blacklisted/logged out)
        if (dbResult.rows.length === 0) {
            return res.status(403).json({ message: "Session has been revoked." });
        }

        // 2. Check if the session has naturally expired past its date rule
        if (new Date() > dbResult.rows[0].expires_at) {
            // Cleanup: delete the expired row from the DB
            await pool.query('DELETE FROM user_sessions WHERE token = $1', [refreshToken]);
            return res.status(403).json({ message: "Session expired." });
        }

        // 3. Everything looks good in the database, now check the JWT signature payload
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decodedPayload) => {
            if (err) return res.status(403).json({ message: "Invalid session signature." });

            // Issue a fresh 15-minute access token!
            const newAccessToken = jwt.sign({ userId: decodedPayload.userId }, process.env.JWT_SECRET_TOKEN, { expiresIn: '15m' });
            res.json({ accessToken: newAccessToken });
        });

    } catch (error) {
        res.status(500).json({ message: "Server error during token rotation." });
    }
});






app.listen(8000, ()=>{
    console.log(`I am alive, runnning on port ${PORT}`)
})
