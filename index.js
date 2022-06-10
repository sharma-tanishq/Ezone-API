const connectToMongoose=require('./connectDb');
const express = require('express');
const cors= require('cors')

// const cors= require('cors')

connectToMongoose();

const app = express();
app.use(express.json());
app.use(cors());
//Routes
app.get('/',(req,res)=>{
    res.send('Working');
})

app.use('/table',require('./routes/requestUser'))

app.listen(process.env.PORT,()=>{console.log(`running`)});