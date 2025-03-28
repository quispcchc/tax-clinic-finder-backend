const express = require('express');
const cors = require('cors');
const routes = require('./routes/authRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api', routes);

app.get('/api/health', (req, res) => {
    res.send('Backend is running');
});

app.use(errorHandler);

module.exports = app;
