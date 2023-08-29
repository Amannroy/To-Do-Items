const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); // Serve static assets from the 'public' folder

let todoList = [];

app.post('/addTodo', (req, res) => {
    const todo = req.body.todo;
    todoList.push(todo);
    res.status(200).json({ message: 'Todo added successfully' });
});

app.get('/getTodos', (req, res) => {
    res.status(200).json(todoList);
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
