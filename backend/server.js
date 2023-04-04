const express = require('express'); 
const colors = require('colors');
const dotenv = require('dotenv').config(); 
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')


//Connect to database 
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
   res.status(200).json({massage: 'Wellcome to Support Dest API!'});
})

//Routes 
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`SERVER IS WORKING ON PORT: ${PORT}`));