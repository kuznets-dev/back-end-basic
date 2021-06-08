const express = require ('express');
const cors = require('cors');
const tasksGET = require ('./routes/tasks/tasks.get');
const taskPOST = require ('./routes/tasks/task.post.js');
const taskPATCH = require ('./routes/tasks/task.patch.js');
const taskDEL = require ('./routes/tasks/task.delete.js');
const registartion = require('./routes/auth/registration.js');
const login = require('./routes/auth/login.js');
const { handleError } = require('./error');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(tasksGET);
app.use(taskPOST);
app.use(taskPATCH);
app.use(taskDEL);
app.use(registartion);
app.use(login);

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})