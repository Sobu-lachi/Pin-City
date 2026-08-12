import express from 'express';
import cors from 'cors';
import pool from './db.js';
import bcrypt from 'bcrypt'

const PORT = process.env.PORT|| 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello!!')
})

app.post('/', (req, res)=>{
    const {username, password} = req.body;
    // console.log(`Received Login Attempt: User=${username} Password=${password}`);

    res.json({ message: 'Done' });
})

app.post('/Sform', async (req, res)=>{
    const {fName, lName, email, userName, password} = req.body;

    try {

        const hashedpassword = await bcrypt.hash(password, 10)
        const sqlQuery = `
            INSERT INTO users (first_name, last_name, email, user_name, user_pword_hash)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [fName, lName, email, userName, hashedpassword];

        const result = await pool.query(sqlQuery, values);
        
        res.status(200);
        // res.json({ 
        //     message: 'User successfully registered in PostgreSQL!', 
        //     user: result.rows[0] 
        // });

    } catch (error) {
        console.error('Database Error:', error);

        if (error.code === '23505') {
            return res.status(400).json({ message: 'Email or Username already taken.' });
        }
        
        res.status(500).json({ message: 'Internal server database error.' });
    }

    // res.json({message:'Done'});
})


app.listen(8000, ()=>{
    console.log(`I am alive, runnning on port ${PORT}`)
})