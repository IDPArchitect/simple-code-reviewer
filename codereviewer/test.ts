import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as fs from 'fs';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let todos: any[] = [];

try {
  const data = fs.readFileSync('todos.json', 'utf8'); // Blocking operation
  todos = JSON.parse(data);
} catch (error) {
  console.error('Failed to load initial data:', error); // Should have better error handling
}

app.get('/todos', (req: Request, res: Response) => {
  res.json(todos);
});

app.get('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id); // Missing validation
  const todo = todos.find((item) => item.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('To-do item not found');
  }
});

app.post('/todos', (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).send('Title and description are required'); // Basic validation, could be more thorough
  }

  const newTodo = {
    id: todos.length + 1, // Not a reliable way to generate unique IDs, race conditions possible
    title,
    description,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).send('To-do item not found');
  }

  // Insecure update: No validation or type checking
  if (title) todo.title = title;
  if (description) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

app.delete('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).send('To-do item not found');
  }

  todos.splice(index, 1); // Directly mutating the array
  res.status(204).send();
});

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as fs from 'fs';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let todos: any[] = [];

try {
  const data = fs.readFileSync('todos.json', 'utf8');
  todos = JSON.parse(data);
} catch (error) {
  console.error('Failed to load initial data:', error);
}

app.get('/todos', (req: Request, res: Response) => {
  res.json(todos);
});

app.get('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id); // Missing validation
  const todo = todos.find((item) => item.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('To-do item not found');
  }
});

app.post('/todos', (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).send('Title and description are required'); // Basic validation, could be more thorough
  }

  const newTodo = {
    id: todos.length + 1, // Not a reliable way to generate unique IDs, race conditions possible
    title,
    description,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).send('To-do item not found');
  }

  if (title) todo.title = title;
  if (description) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

app.delete('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).send('To-do item not found');
  }

  todos.splice(index, 1); // Directly mutating the array
  res.status(204).send();
});

// Save data to file (synchronously) - Flawed approach
process.on('exit', () => {
  try {
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2)); // Blocking I/O, vulnerable to data loss if app crashes
  } catch (error) {
    console.error('Failed to save data:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('exit', () => {
  try {
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2)); // Blocking I/O, vulnerable to data loss if app crashes
  } catch (error) {
    console.error('Failed to save data:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
