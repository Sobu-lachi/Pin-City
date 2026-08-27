import express from 'express';
import { verifyToken } from './Middlewares/dashboardAuth.js';
import { pool } from './db.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/dashboard', verifyToken, async (req, res) => {
    try{
        const result = await pool.query('SELECT first_name FROM users WHERE id = $1',
            [req.user.id]);
            const user = result.rows[0];

            if (!user){
                return res.status(404).json({
                message: "User not found"
            });
            }
            res.json({
            message: user.first_name
        });
    }catch(e){
        res.status(500).json({
            message: `${e} - Server Error`
        });
    }
});

export default dashboardRouter