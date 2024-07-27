const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define your models and routes
const TodoModel = require('./models/Todo'); // Adjust the path if needed

app.get('/api/todos', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  TodoModel.findByIdAndUpdate(id, { done: done }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task: task })
    .then(result => res.json(result))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
