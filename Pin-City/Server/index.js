import express from 'express';
import cors from 'cors';
import {pool, argon2Options} from './db.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import SignupRouter from './Sform.js'
import helmet from 'helmet'

const PORT = process.env.PORT|| 8000;
const app = express();
app.use(cors());
app.use(express.json());



app.get('/', (req, res)=>{
    res.send('Hello!!')
})


app.post('/Lform', async (req, res)=>{
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
    });


        const tokendata = {
            id: user.username,
        }

        const token = jwt.sign(tokendata, process
            .env.JWT_SECRET_TOKEN, {expiresIn:'1h'}
        )
        
        
        return res.json({message: "user found",
            token: token
        })
    }}catch(e){

    }


})

// A Middleware function to guard routes
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decodedPayload) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired session token." });
        }

        req.user = decodedPayload; 
        
        next(); 
    });
}

app.get('/Dashboard', verifyToken, (req, res) => {
    console.log(`User ${req.user.id} is viewing their dashboards.`);
    
    res.json({ secretData: "Welcome to your premium private area!" });
});


app.use('/Sform', SignupRouter);

app.listen(8000, ()=>{
    console.log(`I am alive, runnning on port ${PORT}`)
})
