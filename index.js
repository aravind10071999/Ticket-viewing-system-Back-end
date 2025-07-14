const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://ticket-viewing-system-front-end.onrender.com"
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err.message);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/freshdesk', require('./routes/freshdesk')); // ✅ mount the freshdesk route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
