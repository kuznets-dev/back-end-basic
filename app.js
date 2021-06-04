const express = require ('express');
const tasksGET = require ('./routes/tasks.get.js');
const taskPOST = require ('./routes/task.post.js');
const taskPATCH = require ('./routes/task.patch.js');
const taskDEL = require ('./routes/task.delete.js');
const { handleError } = require('./error');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(tasksGET);
app.use(taskPOST);
app.use(taskPATCH);
app.use(taskDEL);

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})