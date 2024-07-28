require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: ["http://marx-todo.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Log the environment variable to check if it's loaded correctly
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Use the environment variable for MongoDB URI
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('MongoDB URI is not defined. Please check your .env file.');
  process.exit(1); // Exit process with failure
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

const port = process.env.PORT || 3001;

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  }
});

const TodoModel = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/todos', async (req, res) => {
  const todo = new TodoModel({
    task: req.body.task,
    done: false,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, { done: done }, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

