import express from 'express';
import { verifyToken } from './Middlewares/dashboardAuth.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/Dashboard', verifyToken, (req, res) => {
    // console.log(`User ${req.user.id} is viewing their dashboard.`);
    
    res.json({ message: `${req.user.name}`});
});

export default dashboardRouter