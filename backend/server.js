const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ticketRoutes = require('./routes/ticketRoutes');
const PORT = 5000;

const app = express()
app.use(cors());
app.use(express.json());

app.use('/api/tickets',ticketRoutes)

mongoose.connect('add your connecttion string')
.then(()=>{
    console.log('MongoDB connected')
    app.listen(PORT,()=>
        console.log(`server is running on port ${PORT}`));
})

.catch(err=>{
    console.error('mongo not connetcted');
    process.exit(1);
});