import express from 'express';
import {pool} from './db.js';
import { verifyToken } from './Middlewares/dashboardAuth.js';
import crypto from 'crypto';

const pinRouter = express.Router();

pinRouter.post('/generate-pin', verifyToken, async (req, res)=>{
    try{
        const userId = req.user.id;
        const years = new Date().getFullYear();

        const existingPin = await pool.query(`SELECT pin from pins WHERE
            user_id = $1 AND years =$2`, [userId, years]);

        if(existingPin.rows[0]){
            return res.status(409).json({
                message: "You've already generated your pin",
                pin: existingPin.rows[0]
        })
        }

        while(true){
            const pin = crypto.randomInt(1, 1000000).toString().padStart(6, '0');

        try {
            await pool.query(`INSERT into pins(user_id, pin, years)
            VALUES($1, $2, $3)`, [userId, pin, years]);

        res.status(201).json({
            message: 'Pin generated successfully',
            pin
        })
        } catch (error) {
            if (error.code === '23505' && error.constraint === 'unique_pin') 
                {
                    console.log(`Generating pin...`);
                    continue;
                }throw error;
            }
        }
        }catch(error){
        
        console.error('PIN generation error:', error);
        res.status(500).json({
            message: 'Something went wrong while generating your PIN.'
        });
    }
})

export default pinRouter