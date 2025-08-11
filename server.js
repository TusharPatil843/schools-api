require('dotenv').config();
const express = require('express');
const cors = require('cors');
const schoolsRoutes = require('./routes/schools');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', schoolsRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
