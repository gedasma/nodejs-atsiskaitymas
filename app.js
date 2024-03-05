const express = require('express');
const app = express();
app.use(express.json())
const serviceRoutes = require('./routes/serviceRoutes')
const userRoutes = require('./routes/userRoutes')
const repairmanRoutes = require('./routes/repairmanRoutes')
const morgan = require('morgan')


app.use(morgan('dev'))
 
 
//Mounting router
app.use('/api/service',serviceRoutes);
app.use('/api/users',userRoutes);
app.use('/api/repairman',repairmanRoutes);

module.exports = app