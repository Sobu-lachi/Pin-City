import express from 'express';
import cors from 'cors'

const PORT = process.env.PORT|| 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello!!')
})

app.post('/', (req, res)=>{
    const {username, password} = req.body;
    console.log(`Received Login Attempt: User=${username} Password=${password}`);

    res.json({ message: 'Done' });
})


app.listen(8000, ()=>{
    console.log(`I am alive, runnning on port ${PORT}`)
})