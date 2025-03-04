require('dotenv').config()
const express = require('express')
const connectToDb = require('./database/db')
const restaurantRoutes = require('./routes/restaurantRoute')
const authRoutes = require('./routes/authRoutes')
const homeRoutes = require('./routes/homeRoutes')
const adminRoutes = require('./routes/adminRoutes')
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

//connect to database
connectToDb()

//middleware
app.use(express.json())

//routes
app.use('/api/restaurant',restaurantRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/image',imageRoutes);

app.listen(PORT,()=>{
    console.log(`server is now running on port ${PORT}`);
})