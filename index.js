const express = require('express');
const bodyParser = require('body-parser');
const employeeRouters = require('./controllers/employeeRouters');
const cors = require('cors');

const app = express();
const port = 3001;

// CORS configuration
app.use(cors({
    methods: ['GET', 'POST', 'HEAD', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    exposedHeaders: ['x-access-token', 'x-refresh-token']
}));

// Parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use('/tasks', employeeRouters);

// Error handling on startup
app.on('error', (err) => {
    console.error(`Error during startup: ${err.message}`);
});

// Start the server
app.listen(port, () => {
    console.log(`App has started on port ${port}`);
});