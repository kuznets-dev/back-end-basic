const express = require ('express');
const tasksGET = require ('./routes/tasks.get.js');
const taskPOST = require ('./routes/task.post.js');
const taskPATCH = ('./routes/task.patch.js');
const taskDEL = ('./routes/task.delete.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(tasksGET);
app.use(taskPOST);
app.use(taskPATCH);
app.use(taskDEL);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})