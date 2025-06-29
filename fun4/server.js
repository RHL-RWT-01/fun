import express from 'express'

const app = express();

const port = 3000;

app.use(express.json());

const users=[];

app.get('/', (req, res) => {
    res.status(500).json({ msg: "hi" });
})

app.post('/users', async (req, res) => {
    const {name,email,id}=req.body;
    users.push({name,email,id});
    res.status(200).json({msg:"User added success"});
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})