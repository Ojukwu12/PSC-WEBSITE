const morgan = require('morgan');
const AppError = require('./utils/appError');
const limiter = require('./middlewares/rateLimit');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = require('express');
const globalErrorHandler = require('./controllers/error.Controller');
const authRoutes = require('./routes/authRoutes');


app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoutes);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);    