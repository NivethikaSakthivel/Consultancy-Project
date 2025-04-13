const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(process.env.UPLOAD_DIR || 'uploads'));

// Sync DB
db.sequelize.sync().then(() => {
  console.log('Database synced');
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/budgets', require('./routes/budget.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/services', require('./routes/service.routes'));
app.use('/api/presidents', require('./routes/president.routes'));

// Root route
app.get('/', (req, res) => {
  res.send('Rotary Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
