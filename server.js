require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const competitorsRoutes = require('./src/routes/competitors');
const campaignsRoutes = require('./src/routes/campaigns');
const creativesRoutes = require('./src/routes/creatives');
const newsRoutes = require('./src/routes/news');
const insightsRoutes = require('./src/routes/insights');
const alertsRoutes = require('./src/routes/alerts');
const authRoutes = require('./src/routes/auth');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/miplatform';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error('MongoDB connection error:', err); process.exit(1); });

// Routes
app.use('/api/competitors', competitorsRoutes);
app.use('/api/campaigns', campaignsRoutes);
app.use('/api/creatives', creativesRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/auth', authRoutes);

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
